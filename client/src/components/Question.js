function Question({ props }) {
    return (
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#questions-${props.index}`} aria-expanded="false" aria-controls={`questions-${props.index}`}>
                    #{props.index + 1} - {props.question}
                </button>
            </h2>
            <div id={`questions-${props.index}`} className="accordion-collapse collapse">
                <div className="accordion-body">

                    <div className="row g-3">
                        <div className="col-sm-12">
                            <label htmlFor="teacherName" className="form-label">Question</label>
                            <input type="text" className="form-control" id="teacherName" placeholder="Bob" value={props.question} onChange={e => props.setQuestionQuestion(props.index, e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                Multiple Answers
                            </label>
                            {" "}
                            <input className="form-check-input" type="checkbox" checked={props.multipleAnswers} id="flexCheckChecked" onChange={e => props.setQuestionMultipleAnswers(props.index, !(props.multipleAnswers))} />
                        </div>

                        <h5 className="mb-3">Correct Answer</h5>

                        <div className="col-sm-12">
                            <input type="text" className="form-control" id="teacherName" placeholder="Bob" value={props.correctAnswer} onChange={e => props.setQuestionCorrectAnswer(props.index, e.target.value)} />
                        </div>

                        <h5 className="mb-3">Incorrect Answers</h5>

                        <div className="col-sm-12">

                            <input type="text" className="form-control mb-3" id="teacherName" placeholder="Bob" value={props.incorrectAnswers[0]} onChange={e => props.setQuestionIncorrectAnswers(props.index, 0, e.target.value)} />

                            <input type="text" className="form-control mb-3" id="teacherName" placeholder="Bob" value={props.incorrectAnswers[1]} onChange={e => props.setQuestionIncorrectAnswers(props.index, 1, e.target.value)} />

                            <input type="text" className="form-control mb-3" id="teacherName" placeholder="Bob" value={props.incorrectAnswers[2]} onChange={e => props.setQuestionIncorrectAnswers(props.index, 2, e.target.value)} />
                        </div>

                        {/*<div className="col-sm-12">
                            <button type="button" className="btn btn-primary" onClick={_ => props.addQuestionIncorrectAnswer(props.index)} disabled>Add Incorrect Answer</button>
                            {" "}
                            <button type="button" className="btn btn-danger" onClick={_ => props.deleteQuestionIncorrectAnswer(props.index)} disabled>Remove Incorrect Answer</button>
                        </div>*/}

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Question