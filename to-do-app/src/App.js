//This is Ashna's version of the project
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Button,
  InputGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,

} from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import trashSound from "./assets/trash.mp3";
import checkSound from "./assets/check.mp3";

// include font awsome checkmark and trash icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
library.add(faTrash, faCheck);

function App() {
  const [todoCards, setTodoCards] = useState([]);
  const [completedCards, setCompletedCards] = useState([]);
  const [noCardMessage, setNoCardMessage] = useState("No cards to display");
  const [noCompletedCardMessage, setNoCompletedCardMessage] = useState("No cards to display");
  const [deleteButton, setDeleteButton] = useState(<FontAwesomeIcon icon="trash" />);
  const [checkButton, setCheckButton] = useState(<FontAwesomeIcon icon="check" />);



  useEffect(() => {
    
    const storedTodoCards = JSON.parse(localStorage.getItem("todoCards")) || [];
    setTodoCards(storedTodoCards);
    const storedCompletedCards =
      JSON.parse(localStorage.getItem("completedCards")) || [];
    setCompletedCards(storedCompletedCards);



    // print DropdownToggle current value
    const dropdownToggle = document.querySelector(".dropdown-toggle");
    console.log(dropdownToggle.textContent);



    // edit all buttons inside todoButtons div to have pink background
    const todoButtons = document.querySelectorAll(".todoButtons");
    todoButtons.forEach((button) => {
      button.style.backgroundColor = "#FFC0CB";
      button.style.border = "#FFC0CB";
      button.style.color = "black";

      // When you hover over the button, it changes to a darker pink
      button.addEventListener("mouseover", () => {
        button.style.backgroundColor = "#FF69B4";
        button.style.border = "#FF69B4";
      }
      );

      // When you hover off the button, it changes back to the original pink
      button.addEventListener("mouseout", () => {
        button.style.backgroundColor = "#FFC0CB";
        button.style.border = "#FFC0CB";
      }
      );
    }
    );

    
    

  }, []);

    const addCard = (text) => {
      const cardNumber = todoCards.length + 1;
      const newCard = {
        id: Date.now(),
        body: text,
        cardNumber: cardNumber,
      };
      setTodoCards([...todoCards, newCard]);
      localStorage.setItem("todoCards", JSON.stringify([...todoCards, newCard]));
    };

    const removeTodoCard = (id) => {
      const updatedTodoCards = todoCards.filter((card) => card.id !== id);
      setTodoCards(updatedTodoCards);
      localStorage.setItem("todoCards", JSON.stringify(updatedTodoCards));

      // play trash sound
      const audio = new Audio(trashSound);
      audio.play();

    };

    const removeCompletedCard = (id) => {
      const updatedCompletedCards = completedCards.filter(
        (card) => card.id !== id
      );
      setCompletedCards(updatedCompletedCards);
      localStorage.setItem(
        "completedCards",
        JSON.stringify(updatedCompletedCards)
      );
    };

    const completeCard = (id, text) => {
      const newCard = {
        id: id,
        body: text,
        cardNumber: completedCards.length + 1,
      };
      setCompletedCards([...completedCards, newCard]);
      localStorage.setItem(
        "completedCards",
        JSON.stringify([...completedCards, newCard])
      );
      removeTodoCard(id);
      // play check sound
      const audio = new Audio(checkSound);
      audio.volume = 0.2;
      audio.play();
    };

    // Main Body Return of App
    return (
      <>
      <Container>
        <Row>
          <Col className="mx-auto">
            <Card>
              <CardBody>
                <CardForm addCard={addCard} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col >
            <CardList
              cards={todoCards}
              removeCard={removeTodoCard}
              completeCard={completeCard}
            />
          </Col>
          <Col >
            <CompletedCardList
              cards={completedCards}
              removeCard={removeCompletedCard}
            />
          </Col>
        </Row>
      </Container>
      </>
    );


  function CardForm({ addCard }) {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      addCard(text);

      // Clear the add to-do item input field
      setText("");

    };

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    // Function that updates the text of the dropdown button
    
    const updateDropdownText = () => {
      // First check if there are any todo cards
      if (todoCards.length > 0) {
        // If current deleteButton is the word "Delete", change it to the trash icon
        if (deleteButton === "Delete") {
          setDeleteButton(<FontAwesomeIcon icon="trash" />);
        }
        // If current deleteButton is the trash icon, change it to the word "Delete"
        else {
          setDeleteButton("Delete");
        }
      }
    };


    return (
      <>
      <Form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center" }}>
        <InputGroup style={{ flex: 1 }}>
          <Input
            type="text"
            placeholder="Add a to-do item"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

            <Button color="primary" type="submit">
              Add
            </Button>

        </InputGroup>

      </Form>
      <Form style={{ display: "flex", justifyContent: "center", marginTop:"10px", }}>
      <div className="">
        <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
          <DropdownToggle color="primary" caret>Text Option</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={updateDropdownText}>Normal Text</DropdownItem>
            <DropdownItem>Symbols</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      </Form>
      </>
    );
  }


  function CardList({ cards, removeCard, completeCard }) {

    

    return (
      <div>
        <h2>To-Do Items</h2>
        {cards.map((card) => (
          <Card key={card.id} className="my-3">
            <CardBody>
              <div className="d-flex justify-content-between">
                <div className="todoLabel">{card.body}</div>
                <div >
                  <Button
                    className="todoDeleteButton"
                    color="danger"
                    size="sm"
                    onClick={() => removeCard(card.id)}
                  >
                    {deleteButton}
                  </Button>{" "}
                  <Button
                    color="success"
                    size="sm"
                    onClick={() => completeCard(card.id, card.body)}
                  >
                    {checkButton}
                  </Button>
                </div>
              </div>
              
            </CardBody>
          </Card>
        ))}
      </div>
    );
  }



  function CompletedCardList({ cards, removeCard, noCardMessage }) {



    return (
      <div>
        <h2>Completed Items</h2>
        {cards.map((card) => (
          <Card key={card.id} className="my-3">
            <CardBody>
              <div className="d-flex justify-content-between">
                <div>{card.body}</div>
                <div>
                  <h6>Completed</h6>
                </div>
              </div>
              
            </CardBody>
          </Card>
        ))}
      </div>
    );
  }
}

export default App;
