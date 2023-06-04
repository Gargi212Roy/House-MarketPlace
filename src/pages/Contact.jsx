import React from "react";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
function Contact() {
  const [message, setMessage] = useState("");
  const [landLady, setLandLady] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useParams();
  useEffect(() => {
    const getLandLady = async () => {
      console.log(params.landLadyId);
      const docRef = doc(db, "users", params.landLadyId);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
      if (docSnap.exists()) {
        console.log(docSnap.data());
        setLandLady(docSnap.data());
      } else {
        toast.error("LandLady's data could not be fetched");
      }
    };
    getLandLady();
  }, [params.landLadyId]);

  const onChange = (e) => setMessage(e.target.value);

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Contact Landlady</p>
      </header>

      {landLady !== null && (
        <main>
          <div className="contactLandlady">
            <p className="landladyName">Contact {landLady?.name}</p>
          </div>
          <form className="messageForm">
            <div className="messageDiv">
              <label htmlFor="message" className="messageLabel">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="textarea"
                value={message}
                onChange={onChange}
              ></textarea>
            </div>
            <a
              href={`mailto:${landLady.email}?Subject=${searchParams.get(
                "listingName=${listing.Name}"
              )}&body=${message}`}
            >
              <button type="button" className="primaryButton">
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  );
}

export default Contact;
