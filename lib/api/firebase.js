export default (config, firebaseClass) => {
 if(!firebaseClass || typeof firebaseClass !== "object"){
    throw new Error("(DoodleUI) Firebase: please manually install firebase and then provide us firebase class!");
 }

 const _app = firebaseClass.initializeApp(config);
 const _auth = firebaseClass.getAuth(_app);
 const _database = firebaseClass.database.getDatabase(_app);
 const _storage = firebaseClass.storage.getStorage(_app);

 const trycatch = (success, error) => {
  try {
   success();
  } catch (e) {
   error(e);
  }
 };

 return {
  auth: {
   user: _auth?.currentUser,
   onAuth: (success, error) => {
    trycatch(() => {
     firebaseClass.onAuthStateChanged(_auth, (user) => {
      success(user);
     });
    }, error);
   },
   signup: ({ email, password }, success, error) => {
    trycatch(async () => {
     await firebaseClass.signUpWithEmailAndPassword(_auth, email, password);
     success(_auth.currentUser);
    }, error);
   },
   login: ({ email, password }, success, error) => {
    trycatch(async () => {
     await firebaseClass.signInWithEmailAndPassword(_auth, email, password);
     success(_auth.currentUser);
    }, error);
   },
   loginWith: (provider, success, error) => {
    if (provider == "google") {
     trycatch(async () => {
      const provider = new firebaseClass.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      await firebaseClass.signInWithPopup(_auth, provider);
      success(data);
     }, error);
    }
   },
   logout: (success, error) => {
    trycatch(async () => {
     await firebaseClass.signOut(_auth);
     success();
    }, error);
   },
   change: (what, { code, lang = "en", newPassword }, success, error) => {
    trycatch(() => {
     switch (what) {
      case "reset-password":
       handleResetPassword(_auth, code, lang);
       break;
      case "recover-email":
       handleRecoverEmail(_auth, code, lang);
       break;
      case "verify-email":
       handleVerifyEmail(_auth, code, lang);
       break;
     }
     function handleResetPassword(auth, actionCode, lang) {
      firebaseClass.verifyPasswordResetCode(auth, actionCode).then((email) => {
       firebaseClass.confirmPasswordReset(auth, actionCode, newPassword).then((resp) => {
        success(resp, email);
       });
      });
     }
     function handleRecoverEmail(auth, actionCode, lang) {
      let restoredEmail = null;
      firebaseClass.checkActionCode(auth, actionCode)
       .then((info) => {
        restoredEmail = info["data"]["email"];
        return firebaseClass.applyActionCode(auth, actionCode);
       })
       .then(() => {
        success(restoredEmail);
       });
     }
     function handleVerifyEmail(auth, actionCode, lang) {
      firebaseClass.applyActionCode(auth, actionCode).then((resp) => {
       success(resp);
      });
     }
    }, error);
   },
   getUsers: (data, success, error) => {
    trycatch(() => {
     firebaseClass.importUsers(_auth, data).then((r) => {
      if (r.errors.length > 0) {
       r.errors.forEach((e) => {
        error(e);
       });
      }
      success(r);
     });
    }, error);
   },
   deleteUsers: (idArray, success, error) => {
    trycatch(async () => {
     if (Array.isArray(idArray)) {
      if (idArray.length == 0) await firebaseClass.deleteUser(idArray[0]);
      else await firebaseClass.deleteUsers(idArray);
      success();
     }
    }, error);
   },
   updateUser: (newData, success, error) => {},
  },
  database: {
   create: ({ path, value }, success, error) => {
    trycatch(async () => {
     if (await firebaseClass.database.set(firebaseClass.database.ref(_database, path), value)) success();
    }, error);
   },
   read: ({ path, sync = true }, success, error) => {
    trycatch(() => {
     firebaseClass.database.onValue(
      firebaseClass.database.ref(_database, path),
      (snapshot) => {
       success(snapshot.val());
      },
      {
       onlyOnce: sync,
      }
     );
    }, error);
   },
   update: ({ path, value, merge = true }, success, error) => {
    trycatch(async () => {
     if (await firebaseClass.database.update(firebaseClass.database.ref(_database, path), value, { merge })) success();
    }, error);
   },
   delete: (path, success, error) => {
    trycatch(async () => {
     if (await firebaseClass.database.remove(firebaseClass.database.ref(_database, path))) success();
    }, error);
   },
   getUid: (path, success, error) => {
    trycatch(async () => {
     success(await firebaseClass.database.push(firebaseClass.database.ref(_database, path)).key.substring(1));
    }, error);
   },
  },
  storage: {
   upload: ({ path, data: { file, metadata } }, success, error) => {
    trycatch(async () => {
     if (await firebaseClass.storage.uploadBytes(firebaseClass.storage.ref(_storage, path), file, metadata))
      success();
    }, error);
   },
   download: (path, success, error) => {
    trycatch(async () => {
     let r = await firebaseClass.storage.getDownloadURL(firebaseClass.storage.ref(_storage, path)).then((s) => {
      if (r) success(r);
     });
    }, error);
   },
   delete: (success, error) => {
    trycatch(async () => {
     if (await firebaseClass.storage.deleteObject(firebaseClass.storage.ref(_storage, path))) success();
    }, error);
   },
  },
 };
};
