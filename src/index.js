import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

import { saveAs } from "file-saver";
import { Packer } from "docx";
import { sha256 } from 'js-sha256';

import shuffleArraySeed from "./utils/shuffleArraySeed";

import GenerateExam from './utils/GenerateExam'
import modes from "./utils/Modes.js"

import Question from './components/Question'

function App() {
  const [schoolName, setSchoolName] = useState(JSON.parse(localStorage.getItem("egen.schoolName")) || "");
  const [subjectName, setSubjectName] = useState(JSON.parse(localStorage.getItem("egen.subjectName")) || "");
  const [examName, setExamName] = useState(JSON.parse(localStorage.getItem("egen.examName")) || "");
  const [duration, setDuration] = useState(JSON.parse(localStorage.getItem("egen.duration")) || "");

  const [diferentKeys, setDiferentKeys] = useState(JSON.parse(localStorage.getItem("egen.diferentKeys")) || "");
  const [questionsPerExam, setQuestionsPerExam] = useState(JSON.parse(localStorage.getItem("egen.questionsPerExam")) || "");

  const [currentMode, setCurrentMode] = useState(null);

  const [secretKey, setSecretKey] = useState(JSON.parse(localStorage.getItem("egen.secretKey")) || "");
  const [examKey, setExamKey] = useState(JSON.parse(localStorage.getItem("egen.examKey")) || "");
  const [examDate, setExamDate] = useState(JSON.parse(localStorage.getItem("egen.examDate")) || "");
  const [studentsNames, setStudentsNames] = useState(JSON.parse(localStorage.getItem("egen.studentsNames")) || "");

  const [questions, setQuestions] = useState(JSON.parse(localStorage.getItem("egen.questions")) || []);

  const [update, setUpdate] = useState(true);

  useEffect(_ => localStorage.setItem("egen.schoolName", JSON.stringify(schoolName)), [schoolName])
  useEffect(_ => { localStorage.setItem("egen.subjectName", JSON.stringify(subjectName)) }, [subjectName])
  useEffect(_ => { localStorage.setItem("egen.examName", JSON.stringify(examName)) }, [examName])
  useEffect(_ => { localStorage.setItem("egen.duration", JSON.stringify(duration)) }, [duration])

  useEffect(_ => { localStorage.setItem("egen.diferentKeys", JSON.stringify(diferentKeys)) }, [diferentKeys])
  useEffect(_ => { localStorage.setItem("egen.questionsPerExam", JSON.stringify(questionsPerExam)) }, [questionsPerExam])

  useEffect(_ => { localStorage.setItem("egen.secretKey", JSON.stringify(secretKey)) }, [secretKey])
  useEffect(_ => { localStorage.setItem("egen.examKey", JSON.stringify(examKey)) }, [examKey])
  useEffect(_ => { localStorage.setItem("egen.examDate", JSON.stringify(examDate)) }, [examDate])
  useEffect(_ => { localStorage.setItem("egen.studentsNames", JSON.stringify(studentsNames)) }, [studentsNames])

  useEffect(_ => { localStorage.setItem("egen.questions", JSON.stringify(questions)) }, [questions])

  const addQuestion = _ => {
    setQuestions(currentQuestions => currentQuestions.concat({ question: "", multipleAnswers: true, correctAnswer: "", incorrectAnswers: [""] },))
  }

  const deleteQuestion = _ => {
    setQuestions(currentQuestions => currentQuestions.slice(0, -1))
  }

  const setQuestionQuestion = async (index, question) => {
    await setQuestions(currentQuestions => {
      currentQuestions[index].question = question;

      return currentQuestions;
    })

    setUpdate(!update)

    localStorage.setItem("egen.questions", JSON.stringify(questions))
  }

  const setQuestionMultipleAnswers = async (index, multipleAnswers) => {
    await setQuestions(currentQuestions => {
      currentQuestions[index].multipleAnswers = multipleAnswers;

      return currentQuestions;
    })

    setUpdate(!update)

    localStorage.setItem("egen.questions", JSON.stringify(questions))
  }

  const setQuestionCorrectAnswer = async (index, correctAnswer) => {
    await setQuestions(currentQuestions => {
      currentQuestions[index].correctAnswer = correctAnswer;

      return currentQuestions;
    })

    setUpdate(!update)

    localStorage.setItem("egen.questions", JSON.stringify(questions))
  }

  const setQuestionIncorrectAnswers = async (index, index_, incorrectAnswer) => {
    await setQuestions(currentQuestions => {
      currentQuestions[index].incorrectAnswers[index_] = incorrectAnswer;

      return currentQuestions;
    })

    setUpdate(!update)

    localStorage.setItem("egen.questions", JSON.stringify(questions))
  }

  const log = async (test) => {
    var parameters = [];

    if (currentMode.secretKey) { parameters.push(secretKey) }
    if (currentMode.examKey) { parameters.push(examKey) }
    if (currentMode.examDate) { parameters.push(examDate) }
    if (currentMode.studentsNames) { parameters.push(studentsNames) }

    parameters = parameters.join("")

    var mainSha = currentMode.mainShaAlgorithm(...parameters)
    mainSha = mainSha.split("").map((character) => parseInt(character, 16))

    for (var i = 1; i < Number(diferentKeys) + 1; i++) {
      const keySha = sha256(mainSha + i).split("").map((character) => parseInt(character, 16))

      var keyQuestions = []

      await shuffleArraySeed(questions, keySha).forEach((element, index) => {
        var wrong = shuffleArraySeed(element.incorrectAnswers, sha256(keySha + index))

        wrong = wrong.map(answer => { return { text: answer, isCorrect: false } })

        var answers = [
          ...wrong.slice(0, keySha[index] % wrong.length + 1),
          { text: element.correctAnswer, isCorrect: true },
          ...wrong.slice(keySha[index] % wrong.length + 1)
        ]

        keyQuestions.push({ question: element.question, answers })
      })

      var asd = i;

      Packer.toBlob(GenerateExam({ schoolName, subjectName, examName, key: i, questions: keyQuestions, highlightCorrect: test })).then(blob => {
        saveAs(blob, `${examName} - ${subjectName}.${asd}.docx`)
      });
    }
  }

  const generateConfigurationFile = () => {
    const configJson = {
      schoolName,
      subjectName,
      examName,
      duration,
      diferentKeys,
      questionsPerExam,
      currentMode,
      secretKey,
      examKey,
      examDate,
      studentsNames,
      questions
    }
    const blob = new Blob([JSON.stringify(configJson)], { type: 'text/plain;charset=utf-8' })

    saveAs(blob, "react-docx.config.json")
  }

  const loadConfigurationFile = (e) => {
    const reader = new FileReader()
    reader.onload = async (e) => {
      const configuration = JSON.parse(e.target.result)

      setSchoolName(configuration.schoolName)
      setSubjectName(configuration.subjectName)
      setDiferentKeys(configuration.diferentKeys)
      setSecretKey(configuration.secretKey)
      setExamKey(configuration.examKey)
      setExamDate(configuration.examDate)
      setStudentsNames(configuration.studentsNames)
      setQuestions(configuration.questions)
    };
    reader.readAsText(e.target.files[0])
  }

  return (
    <>
      <div className="container mt-3">
        <div className="row g-5">

          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Configuration</span>
            </h4>
            <ul className="list-group mb-3">
              {modes.map((mode, index) => {
                if (index == 0 && !currentMode) setCurrentMode(mode);
                return (
                  <li key={index} className={`list-group-item list-group-item-action nav-link${index == 0 ? " active" : ""}${index == 0 ? "" : " disabled"} `} id={`configuration-${mode.label.toLowerCase().replace(/ /g, "-")}-tab`} data-bs-toggle="pill" data-bs-target={`#configuration-${mode.label.toLowerCase().replace(/ /g, "-")}`} type="button" aria-controls={`configuration-${mode.label.toLowerCase().replace(/ /g, "-")}`} aria-selected={index == 0 ? "true" : "false"} onClick={_ => setCurrentMode(mode)}>
                    <h6 className="my-0">{mode.label}</h6>
                    <small>{mode.description}</small>
                  </li>
                )
              })}
            </ul>

            <div className="card p-2 mb-3">
              <div className="tab-content" id="configuration-tabContent">
                {modes.map((mode, index) => <div key={index} className={`tab-pane fade${index == 0 ? " show active" : ""}`} id={`configuration-${mode.label.toLowerCase().replace(/ /g, "-")}`} role="tabpanel" aria-labelledby={`configuration-${mode.label.toLowerCase().replace(/ /g, "-")}-tab`} tabIndex="0">

                  {mode.secretKey && <div className="mb-3">
                    <label htmlFor="secret-exam-secret" className="form-label">Secret Key</label>
                    <div className="input-group flex-nowrap">
                      <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                      <input id="secret-exam-secret" type="text" className="form-control" placeholder="This is a secret" value={secretKey} onChange={e => setSecretKey(e.target.value)} />
                    </div>
                  </div>}

                  {mode.examKey && <div className="mb-3">
                    <label htmlFor="secret-exam-exam" className="form-label">Exam Key</label>
                    <div className="input-group flex-nowrap">
                      <span className="input-group-text"><i className="bi bi-key"></i></span>
                      <input id="secret-exam-exam" type="text" className="form-control" placeholder="1234" value={examKey} onChange={e => setExamKey(e.target.value)} />
                    </div>
                  </div>}

                  {mode.examDate && <div className="mb-3">
                    <label htmlFor="secret-exam-date" className="form-label">Exam Date</label>
                    <div className="input-group flex-nowrap">
                      <span className="input-group-text"><i className="bi bi-calendar"></i></span>
                      <input id="secret-exam-date" type="text" className="form-control" placeholder="5/19/2023" value={examDate} onChange={e => setExamDate(e.target.value)} />
                    </div>
                  </div>}

                  {mode.studentsNames && <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">Upload Students File</label>
                    <input className="form-control" type="file" id="formFile" />
                    <div className="form-text" id="basic-addon4">Text file with the names of the students separated by a line break. When using Student Name this is ignored.</div>
                  </div>}
                </div>
                )}
              </div>
            </div>
            <div className="card p-2 mb-3">
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">Upload Configuration File</label>
                <input className="form-control" type="file" id="formFile" onChange={loadConfigurationFile} />
              </div>
              <div className="mb-3">
                <button type="button" className="btn btn-primary" onClick={_ => generateConfigurationFile()}>Get Configuration File</button>
              </div>
            </div>

          </div>
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Exam Data</h4>
            <div className="row g-3">
              <div className="col-sm-6">
                <label htmlFor="schoolName" className="form-label">School Name</label>
                <input type="text" className="form-control" id="schoolName" placeholder="Bob" value={schoolName} onChange={e => setSchoolName(e.target.value)} />
              </div>

              <div className="col-sm-6">
                <label htmlFor="subjectName" className="form-label">Subject Name</label>
                <input type="text" className="form-control" id="subjectName" placeholder="Math" value={subjectName} onChange={e => setSubjectName(e.target.value)} />
              </div>

              <div className="col-sm-6">
                <label htmlFor="examName" className="form-label">Exam Name</label>
                <input type="text" className="form-control" id="examName" placeholder="Math" value={examName} onChange={e => setExamName(e.target.value)} />
              </div>

              <div className="col-sm-6">
                <label htmlFor="duration" className="form-label">Duration</label>
                <input type="number" className="form-control" id="duration" placeholder="1" value={duration} onChange={e => setDuration(e.target.value)} />
              </div>

              <div className="col-sm-6">
                <label htmlFor="diferentKeys" className="form-label">Diferent Keys</label>
                <input type="number" className="form-control" id="diferentKeys" placeholder="1" value={diferentKeys} onChange={e => setDiferentKeys(e.target.value)} />
                <div className="form-text" id="basic-addon4">A number representing how many diferent keys you want to generate.</div>
              </div>

              <div className="col-sm-6">
                <label htmlFor="questionsPerExam" className="form-label">Questions per Exam</label>
                <input type="number" className="form-control" id="questionsPerExam" placeholder="1" value={questionsPerExam} onChange={e => setQuestionsPerExam(e.target.value)} disabled />
                <div className="form-text" id="basic-addon4">A number representing how many questions add to the exam.</div>
              </div>
            </div>

            <hr />
            <h4 className="mb-3">Questions & Answers</h4>

            <div className="accordion mb-3" id="accordionPanelsStayOpenExample">
              {
                questions.map((question, index) => {
                  question.index = index;
                  question.key = index;

                  question.setQuestionQuestion = setQuestionQuestion;
                  question.setQuestionMultipleAnswers = setQuestionMultipleAnswers;
                  question.setQuestionCorrectAnswer = setQuestionCorrectAnswer;

                  question.setQuestionIncorrectAnswers = setQuestionIncorrectAnswers;

                  return (<Question key={index} props={question} />)
                })
              }
            </div>
            <div className="col-sm-12 mb-3">
              <button type="button" className="btn btn-primary" onClick={_ => addQuestion()}>Add Question</button>
              {" "}
              <button type="button" className="btn btn-danger" onClick={_ => deleteQuestion()}>Remove Last Question</button>
            </div>

            <hr />
            <h4 className="mb-3">Generate</h4>

            <div className="col-sm-12">
              <button type="button" className="btn btn-primary" onClick={_ => log()}>Generate Exams</button>
              {" "}
              <button type="button" className="btn btn-success" onClick={_ => log(true)}>Generate Exams With Answers</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const container = document.getElementById("root")
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<React.StrictMode><App /></React.StrictMode>);
