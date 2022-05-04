import { useState, useEffect, useContext } from "react";
import NavDash from "../../components/NavDash";
import Sidebar from "../../components/Sidebar";
import { FileOpenOutlined } from "@mui/icons-material";

import { doc, serverTimestamp, setDoc, collection, addDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";

const New = () => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPer] = useState(null);

  const {currentUser} = useContext(AuthContext)

  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      // const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPer(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await setDoc(doc(db, "users", localStorage.getItem("user").uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });
    } catch (error) {}
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <NavDash />
        <form className="form" onSubmit={handleSubmit}>
          <div className="formInput">
            <label htmlFor="file">
              File: <FileOpenOutlined className="icon" />
            </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
          </div>
          <div className="formInput">
            <label htmlFor="description">Description:</label>
            <textarea
              onChange={handleInput}
              name="description"
              id="description"
              cols="50"
              rows="10"
            ></textarea>
          </div>
          <button type="submit" disabled={per !== null && per < 100}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default New;
