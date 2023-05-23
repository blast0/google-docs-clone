import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
import StateToPdfMake from "draft-js-export-pdfmake";
import TextEditor from "../../components/TextEditor";
import { AuthContext } from "../../context/firebase";
import { useContext, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { signOut } from "@firebase/auth";
import { auth, firestore } from "../../fireabase/config";
import { doc, getDoc } from "@firebase/firestore";
import { useState } from "react";
import {
  starSvg,
  commentSvg,
  videoSvg,
  lockSvg,
} from "../../components/constants";
import "./editor.css";

const Editor = () => {
  const { user, setUser } = useContext(AuthContext);
  const [userDoc, setUserDoc] = useState(null);
  const history = useHistory();
  const { id } = useParams();
  if (user === null) history.push("/");

  useEffect(() => {
    const getUerDoc = async () => {
      const docRef = doc(
        firestore,
        "userDocs",
        `${user?.uid}`,
        "docs",
        `${id}`
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setUserDoc(docSnap.data());
      else history.push("/");
    };
    getUerDoc();
  }, [id, user?.uid, history]);
  return (
    <>
      <header className="flex justify-between items-center  pb-1 editor-header">
        <span className="home pointer">
          <Link to="/">
            <div className="home-icon pointer">
              <img
                src="https://i0.wp.com/www.techbooky.com/wp-content/uploads/2021/05/1200px-Google_Docs_2020_Logo.svg.png?fit=1200%2C1650&ssl=1"
                height="25px"
                width="25px"
                alt=""
              />
            </div>
          </Link>
        </span>
        <div className="flex-grow px-2">
          <div className="file-details">
            <h2 className="filename">{userDoc?.name}</h2>
            {/* <input type="text" value={userDoc?.name} name="" id="name" /> */}
            <div className="favourite centerhv">{starSvg}</div>
          </div>

          <div className="menu-options flex items-center overflow-x-scroll text-sm space-x-1 text-gray-600">
            <p className="option">File</p>
            <p className="option">Edit</p>
            <p className="option">View</p>
            <p className="option">Insert</p>
            <p className="option">Format</p>
            <p className="option">Tools</p>
            <p className="option">Extensions</p>
            <p className="option">Help</p>
          </div>
        </div>
        {/* <div className="last-edit centerhv">{lastEditSvg}</div> */}
        <div className="comment-icon pointer centerhv">{commentSvg}</div>
        <div className="video-icon pointer centerhv">
          {videoSvg}
          <img
            src="https://charbase.com/images/glyph/9662"
            height="20px"
            width="20px"
            alt=""
          />
        </div>
        <div
          className="share-btn pointer centerhv"
          onClick={() => {
            const stateToPdfMake = new StateToPdfMake(userDoc?.editorState);
            // console.log(stateToPdfMake.generate());
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
            pdfMake
              .createPdf(stateToPdfMake.generate())
              .download(`${userDoc?.name}.pdf`);
          }}
        >
          {lockSvg}
          <span>Share</span>
        </div>
        <div className="profile-icon centerhv pointer profile-icon-editor">
          <img
            src={user?.photoURL}
            alt={user?.displayName}
            title={user?.displayName}
            className="cursor-pointer h-8 w-8 rounded-full "
            onClick={() => {
              signOut(auth);
              setUser(null);
            }}
          />
        </div>
      </header>
      <TextEditor uid={user?.uid} id={id} />
    </>
  );
};

export default Editor;
