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
  const [deleteButton, setDeleteButton] = useState( <FontAwesomeIcon icon="trash" />);
  const [checkButton, setCheckButton] = useState(<FontAwesomeIcon icon="check" />);
  const [deleteButtonColor, setDeleteButtonColor] = useState("default");
  const [deleteButtonBorderColor, setDeleteButtonBorderColor] = useState("default");
  const [deleteButtonTextColor, setDeleteButtonTextColor] = useState("default");
  const [checkButtonColor, setCheckButtonColor] = useState("default");
  const [checkButtonBorderColor, setCheckButtonBorderColor] = useState("default");
  const [checkButtonTextColor, setCheckButtonTextColor] = useState("default");




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
    const [colorDropdownOpen, setColorDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const colorToggle = () => setColorDropdownOpen((prevState) => !prevState);

    // Function that updates the text of the dropdown button
    
    const setTextToText = () => {
      if (todoCards.length > 0) {
        setDeleteButton("Delete");
        setCheckButton("Complete");
      }
    };

    const setTextSymbol = () => {
      // First check if there are any todo cards
      if (todoCards.length > 0) {
        setDeleteButton(<FontAwesomeIcon icon="trash" />);
        setCheckButton(<FontAwesomeIcon icon="check" />);
      }
    };

    const blackAndWhite = () => {
      setDeleteButtonColor("white");
      setDeleteButtonBorderColor("black");
      setDeleteButtonTextColor("black");
      setCheckButtonColor("white");
      setCheckButtonBorderColor("black");
      setCheckButtonTextColor("black");
    };

    const defaultColors = () => {
      setDeleteButtonColor("default");
      setDeleteButtonBorderColor("default");
      setDeleteButtonTextColor("default");
      setCheckButtonColor("default");
      setCheckButtonBorderColor("default");
      setCheckButtonTextColor("default");
    };

    const deuteranomalyColors = () => {
      setDeleteButtonColor("red");
      setDeleteButtonBorderColor("red");
      setDeleteButtonTextColor("white");
      setCheckButtonColor("blue");
      setCheckButtonBorderColor("blue");
      setCheckButtonTextColor("white");
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
            <DropdownItem onClick={setTextToText}>Normal Text</DropdownItem>
            <DropdownItem onClick={setTextSymbol}>Symbols</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="">
        <Dropdown isOpen={colorDropdownOpen} toggle={colorToggle} direction="down">
          <DropdownToggle color="primary" caret>Color Options</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={defaultColors}>Default</DropdownItem>
            <DropdownItem onClick={deuteranomalyColors}>Deuteranomaly</DropdownItem>
            <DropdownItem onClick={blackAndWhite}>Black and White</DropdownItem>
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
                <div className="todoCardButtons" >
                  <Button
                    className="todoDeleteButton"
                    color="danger"
                    size="sm"

                    // When you hover over the button, change the color to red
                    style={{ backgroundColor: deleteButtonColor, borderColor: deleteButtonBorderColor, color: deleteButtonTextColor}}
                    on
                    onClick={() => removeCard(card.id)}
                  >
                    {deleteButton}
                  </Button>{" "}
                  <Button
                    color="success"
                    size="sm"
                    // update the style so the backgroundcolor of the button deleteButtonColor (which is a state)
                    style={{ backgroundColor: checkButtonColor, borderColor: checkButtonBorderColor, color: checkButtonTextColor }}
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
