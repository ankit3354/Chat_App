import React, { useState, useEffect } from "react";
import client, {
  COLLECTION_MESSAGE_ID,
  DATABASES_ID,
  databases,
} from "../appwriteConfig";
import { ID, Permission, Query, Role } from "appwrite";
import "../index.css";
import { Trash2 } from "lucide-react";
import Header from "../components/Header";
import { useAuth } from "../utils/AuthContext";

function Room() {
  const { user } = useAuth();
  const [messages, setMessage] = useState([]);
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    getMessages();

    const unsubscribe = client.subscribe(
      `databases.${DATABASES_ID}.collections.${COLLECTION_MESSAGE_ID}.documents`,

      (response) => {
        // console.log("RealTime ", response);
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          console.log("A MESSAGE WAS CREATED");
          setMessage((prevState) => [response.payload, ...prevState]);
        }

        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          console.log("A MESSAGE WAS DELETED !!!");
          setMessage((preState) =>
            preState.filter((message) => message.$id !== response.payload.$id)
          );
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASES_ID,
      COLLECTION_MESSAGE_ID,
      [Query.orderDesc("$createdAt"), Query.limit(100)]
    );
    console.log("Response : ", response);
    setMessage(response.documents);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("MESSAGE:", messageBody);

    let permissions = [Permission.write(Role.user(user.$id))];

    let payload = {
      user_id: user.$id,
      username: user.name,
      body: messageBody,
    };

    let response = databases.createDocument(
      DATABASES_ID,
      COLLECTION_MESSAGE_ID,
      ID.unique(),
      payload,
      permissions
    );

    console.log("Created :", response);

    // setMessage((prevState) => [response, ...prevState]);
    setMessageBody("");
  };

  const handleDelete = async (messageID) => {
    await databases.deleteDocument(
      DATABASES_ID,
      COLLECTION_MESSAGE_ID,
      messageID
    );
    // setMessage((preState) =>
    //   messages.filter((message) => message.$id !== messageID)
    // );
  };

  return (
    <main className="container">
      <Header />
      <div className="room--container">
        <form onSubmit={handleSubmit} id="message--form">
          <div>
            <textarea
              required
              maxLength={250}
              placeholder="Say something..."
              onChange={(e) => setMessageBody(e.target.value)}
              value={messageBody}
            ></textarea>
          </div>

          <div className="send-btn--wrapper">
            <input className="btn btn--secondary" type="submit" value="Send" />
          </div>
        </form>

        <div>
          {messages.map((message) => (
            <div key={message.$id} className="message--wrapper">
              <div className="message--header">
                <p>
                  {message?.username ? (
                    <>
                      <span>{message.username}</span>
                    </>
                  ) : (
                    <>
                      <span>Anonymous user</span>
                    </>
                  )}
                  <small className="message-timestamp">
                    {new Date(message.$createdAt).toLocaleString()}
                  </small>
                </p>

                {message.$permissions.includes(
                  `delete(\"user:${user.$id}\")`
                ) && (
                  <Trash2
                    className="delete--btn"
                    onClick={() => {
                      handleDelete(message.$id);
                    }}
                  />
                )}
              </div>
              <div
                className={
                  "message--body " +
                  (message.user_id === user.$id ? "message--body--owner" : "")
                }
              >
                <span>{message.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Room;
