// importing components
import Header from "../../components/Header";
import DocRow from "../../components/DocRow";

// importing material ui
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Modal from "@material-tailwind/react/Modal";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import ModalBody from "@material-tailwind/react/ModalBody";
import { useContext, useEffect, useState } from "react";

// Firestore
import { firestore } from "../../fireabase/config";
import {
  addDoc,
  //   getDocs,
  collection,
  serverTimestamp,
  //   query,
  //   orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useHistory } from "react-router";
import { AuthContext } from "../../context/firebase";
import Leftmenu from "../../components/LeftMenu/leftmenu";
import "./home.css";

const Home = () => {
  const [showModel, setShoModel] = useState(false);
  const [input, setInput] = useState("");
  const [userDoc, setUserDoc] = useState([]);
  const [showmenu, setShowmenu] = useState(false);
  const history = useHistory();

  const { user } = useContext(AuthContext);

  if (user === null) history.push("/login");
  const createDoc = async () => {
    if (!input) return;
    setInput("");
    setShoModel(false);

    const docRef = await addDoc(
      collection(firestore, "userDocs", `${user?.uid}`, "docs"),
      {
        name: `${input}`,
        time: serverTimestamp(),
      }
    );
    history.push(`/doc/${docRef?.id}`);
  };
  const model = (
    <Modal size="sm" active={showModel} toggler={() => setShoModel(false)}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createDoc();
        }}
      >
        <ModalBody>
          <input
            type="text"
            className="outline-none w-full bg-gray-200  p-3 rounded-md"
            placeholder="Enter name of the document."
            onChange={({ target }) => setInput(target.value)}
            value={input}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="blue"
            buttonType="link"
            onClick={() => setShoModel(false)}
            ripple="dark"
          >
            Cancle
          </Button>
          <Button color="blue" onClick={createDoc} ripple="dark" type="submit">
            Create
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );

  useEffect(() => {
    const unsub = onSnapshot(
      collection(firestore, "userDocs", `${user?.uid}`, "docs"),
      (snap) => {
        setUserDoc(
          snap.docs?.map((doc) => ({
            id: doc?.id,
            ...doc.data(),
          }))
        );
      }
    );
    return () => unsub();
  }, [user?.uid]);

  console.log(showmenu);
  return (
    <>
      {showmenu ? <Leftmenu /> : null}
      <Header
        toggleMenu={() => {
          setShowmenu(true);
        }}
      />
      <div
        onClick={() => {
          setShowmenu(false);
        }}
      >
        {model}
        <section
          style={{ background: "#f8f9fa" }}
          className="bg-[#f8f9fa] template-section"
        >
          <div className="max-w-6xl w-full mx-auto">
            <div className="py-3 flex items-center justify-between">
              <h2 className="text-gray-700">Start a new document</h2>
              <div className="gallery-options">
                <div className="bar">
                  <div className="templates-btn">
                    Template gallery
                    <img
                      className="updown"
                      height="15px"
                      width="15px"
                      src="https://static.thenounproject.com/png/2876820-200.png"
                      alt=""
                    />
                  </div>
                </div>

                <div className="template-settings">
                  <Icon name="more_vert" size="2xl" color="black" />
                </div>
              </div>
            </div>
            <div>
              <div
                className="relative border-2 cursor-pointer newdoc-icon hover:border-blue-700"
                onClick={() => setShoModel(true)}
              >
                <img src="https://links.papareact.com/pju" alt="add-doc" />
              </div>
              <p className="ml-1 mt-3 font-semibold text-sm text-gray-700">
                Blank
              </p>
            </div>
          </div>
        </section>
        <section className="bg-white w-full md:px-10 md:mb-20">
          <div className="max-w-6xl mx-auto py-2 text-sm text-gray-700">
            <div className="flex p-4 items-center justify-between">
              <h2 className="font-medium flex-grow">Recent Documents</h2>
              <p className="mr-12">Date Created</p>
              <Icon name="folder" size="3xl" color="gray" />
            </div>
          </div>
          {userDoc.length === 0 ? (
            <div className="w-full text-center py-5">No documents</div>
          ) : (
            ""
          )}
          {userDoc?.map((doc) => (
            <DocRow
              id={doc?.id}
              key={doc?.id}
              fileName={doc?.name}
              date={doc?.time}
            />
          ))}
        </section>
      </div>
    </>
  );
};

export default Home;
