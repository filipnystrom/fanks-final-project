const BackButton = ({ setClicked }) => {
  const backButtonHandler = (e) => {
    e.preventDefault();
    setClicked(false);
  }

  return (
    <button onClick={backButtonHandler}>Back</button>
  )
}

export default BackButton;