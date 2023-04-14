import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
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
// Get LogoName image from assets folder
import LogoName from "./assets/LogoName2.png";
// include font awsome checkmark and trash icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
library.add(faTrash, faCheck, faUndo);

function App() {
  const [todoCards, setTodoCards] = useState([]);
  const [completedCards, setCompletedCards] = useState([]);
  const [noCardMessage, setNoCardMessage] = useState("No cards to display");
  const [noCompletedCardMessage, setNoCompletedCardMessage] = useState("No cards to display");
  const [deleteButton, setDeleteButton] = useState( <FontAwesomeIcon icon="trash" />);
  const [checkButton, setCheckButton] = useState(<FontAwesomeIcon icon="check" />);
  const [deleteButtonColor, setDeleteButtonColor] = useState("#DC3545");
  const [deleteButtonBorderColor, setDeleteButtonBorderColor] = useState("#DC3545");
  const [deleteButtonTextColor, setDeleteButtonTextColor] = useState("default");
  const [deleteButtonColorHover, setDeleteButtonColorHover] = useState("#b5333f");
  const [checkButtonColor, setCheckButtonColor] = useState("default");
  const [checkButtonBorderColor, setCheckButtonBorderColor] = useState("default");
  const [checkButtonTextColor, setCheckButtonTextColor] = useState("default");
  const [checkButtonColorHover, setCheckButtonColorHover] = useState("default");
  const [fontWeight, setFontWeight] = useState("500");




  useEffect(() => {
    
    const storedTodoCards = JSON.parse(localStorage.getItem("todoCards")) || [];
    setTodoCards(storedTodoCards);
    const storedCompletedCards =
      JSON.parse(localStorage.getItem("completedCards")) || [];
    setCompletedCards(storedCompletedCards);

  

    // print DropdownToggle current value
    const dropdownToggle = document.querySelector(".dropdown-toggle");
    console.log(dropdownToggle.textContent);



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


    const removeCardSound = (id) => {
      const audio = new Audio(trashSound);
      audio.volume = 0.2;
      audio.play();
      removeTodoCard(id);
    };


    const removeTodoCard = (id) => {
      const updatedTodoCards = todoCards.filter((card) => card.id !== id);
      setTodoCards(updatedTodoCards);
      localStorage.setItem("todoCards", JSON.stringify(updatedTodoCards));



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
                      <br/>
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
              removeCard={removeCardSound}
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

    //setTextandSymbol
    const setTextAndSymbol = () => {
      if (todoCards.length > 0) {
        setDeleteButton(
          <>
            <span>Delete </span>
            <FontAwesomeIcon icon="trash" />
          </>

        );
        setCheckButton(
          <>
            <span>Complete </span>
            <FontAwesomeIcon icon="check" />
          </>
        )
      }
    };

    const blackAndWhite = () => {
      setDeleteButtonColor("white");
      setDeleteButtonBorderColor("black");
      setDeleteButtonTextColor("black");
      setDeleteButtonColorHover("#c8ccc9");
      setCheckButtonColor("white");
      setCheckButtonBorderColor("black");
      setCheckButtonTextColor("black");
      setCheckButtonColorHover("#c8ccc9");
    };

    const defaultColors = () => {
      setDeleteButtonColor("#DC3545");
      setDeleteButtonBorderColor("#DC3545");
      setDeleteButtonTextColor("white");
      setDeleteButtonColorHover("#b5333f");
      setCheckButtonColor("#198754");
      setCheckButtonBorderColor("#198754");
      setCheckButtonTextColor("white");
      setCheckButtonColorHover("#13633e");
    };

    const deuteranomalyColors = () => {
      setDeleteButtonColor("#d8901f");
      setDeleteButtonBorderColor("#d8901f");
      setDeleteButtonTextColor("white");
      setDeleteButtonColorHover("#bf7602");
      setCheckButtonColor("#075bed");
      setCheckButtonBorderColor("#075bed");
      setCheckButtonTextColor("white");
      setCheckButtonColorHover("#184eab");
    };





    return (
      <>

      <Form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center",  }}>
      <img style={{width:"100px"}} src={LogoName} alt="LogoName" /> 
        <InputGroup style={{ flex: 1 }}>
          
          <Input
            type="text"
            placeholder="Add a to-do item"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{fontWeight:700, color:"black"}}
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
            <DropdownItem onClick={setTextAndSymbol}>Text + Symbols</DropdownItem>

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

    
    const hoverOverDeleteButton = (id) => {
      const deleteButton = document.getElementById(id);
      deleteButton.style.backgroundColor = deleteButtonColorHover;
    };

    const leaveHoverOverDeleteButton = (id) => {
      const deleteButton = document.getElementById(id);
      deleteButton.style.backgroundColor = deleteButtonColor;
    };

    const hoverOverCheckButton = (id) => {
      const checkButton = document.getElementById(id);
      checkButton.style.backgroundColor = checkButtonColorHover;
    };

    const leaveHoverOverCheckButton = (id) => {
      const checkButton = document.getElementById(id);
      checkButton.style.backgroundColor = checkButtonColor;
    };
    
    return (
      <div>
        <h2>To-Do Items</h2>
        {cards.map((card) => (
          <Card key={card.id} className="my-3">
            <CardBody>
              <div className="d-flex justify-content-between">
                <div
                 className="todoLabel"
                 style={{fontWeight:fontWeight}}>{card.body}</div>
                <div className="todoCardButtons" >
                  <Button
                    className="todoDeleteButton"
                    color="danger"
                    size="sm"
                    id = {card.id + "delete"} 

                    // Onmouse over set the background color to green for this button (for this id only)
                    onMouseOver={() => hoverOverDeleteButton(card.id + "delete")}
                    onMouseLeave={() => leaveHoverOverDeleteButton(card.id + "delete")}
              
                    style={{ backgroundColor: deleteButtonColor, borderColor: deleteButtonBorderColor, color: deleteButtonTextColor, fontWeight: fontWeight}}
                    
                    onClick={() => removeCard(card.id)}
                  >
                    {deleteButton}
                  </Button>{" "}
                  <Button
                    color="success"
                    size="sm"
                    id = {card.id + "check"}
                    onMouseOver={() => hoverOverCheckButton(card.id + "check")}
                    onMouseLeave={() => leaveHoverOverCheckButton(card.id + "check")}
                    // update the style so the backgroundcolor of the button deleteButtonColor (which is a state)
                    style={{ backgroundColor: checkButtonColor, borderColor: checkButtonBorderColor, color: checkButtonTextColor, fontWeight: fontWeight }}
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
    const undoCard = (id) => {
      const cardToUndo = completedCards.find((card) => card.id === id);
      const updatedCompletedCards = completedCards.filter(
        (card) => card.id !== id
      );
      setCompletedCards(updatedCompletedCards);
      localStorage.setItem(
        "completedCards",
        JSON.stringify(updatedCompletedCards)
      );
      const updatedTodoCards = [...todoCards, cardToUndo];
      setTodoCards(updatedTodoCards);
      localStorage.setItem("todoCards", JSON.stringify(updatedTodoCards));
    };


    return (
      <div>
        <h2>Completed</h2>
        {cards.length > 0 ? (
          cards.map((card) => (
            <Card key={card.id} className="my-3">
              <CardBody>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="mr-3">{card.body}</div>
                  <div className="todoCardButtons">
                    <Button
                      className="todoDeleteButton"
                      color="warning"
                      size="sm"
                      onClick={() => undoCard(card.id)}
                    >
                      <FontAwesomeIcon icon={faUndo} />
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        ) : (
          <p>{noCompletedCardMessage}</p>
        )}
      </div>
    );

  }
}

export default App;
