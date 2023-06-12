import { Document, Packer, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle, UnderlineType, Header, TextDirection, VerticalAlign, HeightRule, ImageRun } from 'docx';

import UANL from '../images/UANL.png'

function And(a, b) { return a && b }

function GenerateExam({ schoolName = "PREPARATORIA NO. 20", subjectName = "NOMBRE DE LA MATERIA", examName = "EXAMEN PARCIAL", key = "XXX00", duration = "100", questions = [], highlightCorrect = false }) {

    const doc = new Document({
        sections: [{
            headers: {
                default: new Header({
                    children: [

                        new Table({
                            rows: [
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            children: [],
                                            borders: {
                                                top: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                                bottom: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                                left: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                                right: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                            }
                                        }),
                                        new TableCell({
                                            children: [new Paragraph({ children: [new TextRun({ text: `RC-EA-011 REV. 00-09/05` })], alignment: AlignmentType.END })],
                                            borders: {
                                                top: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                                bottom: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                                left: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                                right: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                            },
                                            height: {
                                                value: 4535,
                                                rule: HeightRule.AUTO
                                            }
                                        }),
                                    ],
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            children: [
                                                /*new ImageRun({
                                                    data: UANL,
                                                    transformation: {
                                                        width: 200,
                                                        height: 200,
                                                    },
                                                    floating: {
                                                        horizontalPosition: {
                                                            offset: 1014400,
                                                        },
                                                        verticalPosition: {
                                                            offset: 1014400,
                                                        },
                                                    },
                                                })*/
                                            ],
                                            borders: {
                                                top: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                                bottom: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                                left: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                                right: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                            }
                                        }),
                                        new TableCell({
                                            children: [new Paragraph({ children: [new TextRun({ text: `RC-EA-011 REV. 00-09/05` })], alignment: AlignmentType.END })],
                                            borders: {
                                                top: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                                bottom: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                                left: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                                right: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                            },
                                            height: {
                                                value: 4535,
                                                rule: HeightRule.AUTO
                                            }
                                        }),
                                    ],
                                }),
                            ],
                            width: {
                                size: 9070,
                                type: WidthType.DXA,
                            },
                            height: {
                                value: 4535,
                                rule: HeightRule.AUTO
                            }
                        }),

                    ],
                }),
            },
            children: [
                new Paragraph({
                    children: [
                        new TextRun({ text: "UNIVERSIDAD AUTONOMA DE NUEVO LEON", bold: true, font: "Times New Roman", size: 28, allCaps: true })
                    ],
                    alignment: AlignmentType.CENTER
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: schoolName, bold: true, font: "Times New Roman", size: 28, allCaps: true })
                    ],
                    alignment: AlignmentType.CENTER
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: subjectName, font: "Arial", size: 20, allCaps: true })
                    ],
                    alignment: AlignmentType.CENTER
                }),
                new Table({
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    children: [new Paragraph(`# ${examName}`)],
                                    borders: {
                                        top: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                        bottom: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                        left: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                        right: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                    }
                                }),
                                new TableCell({
                                    children: [new Paragraph({ text: `CLAVE ${key}`, alignment: AlignmentType.END })],
                                    borders: {
                                        top: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                        bottom: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                        left: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                        right: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                    }
                                }),
                            ],
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    children: [],
                                    borders: {
                                        top: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                        bottom: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                        left: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                        right: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                    }
                                }),
                                new TableCell({
                                    children: [new Paragraph({ text: `Duracion ${duration} min`, alignment: AlignmentType.END })],
                                    borders: {
                                        top: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                        bottom: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                        left: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                        right: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                    }
                                }),
                            ],
                        }),
                    ],
                    width: {
                        size: 9070,
                        type: WidthType.DXA,
                    }
                }),
                new Paragraph({
                    children: [new TextRun({ text: "NOMBRE:____________________________________ MATRICULA:____________ GRUPO:_____", font: "Arial", size: 20, allCaps: true })]
                }),
                new Paragraph({
                    children: [new TextRun({ text: "Instrucciones: Responde correctamente a cada pregunta.", font: "Arial", size: 20 })]
                }),
                ...questions.map(question => {
                    return [
                        new Paragraph(""),
                        new Paragraph(question.question),
                        new Table({
                            rows: [
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            children: [new Paragraph({
                                                children: [new TextRun({ text: `A) ${question.answers[0].text}`, ...((question.answers[0].isCorrect && highlightCorrect) && { highlight: "yellow", }) })]
                                            })],
                                            borders: {
                                                top: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                                bottom: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                                left: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                                right: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                            },
                                        }),
                                        new TableCell({
                                            children: [new Paragraph({
                                                children: [new TextRun({ text: `B) ${question.answers[1].text}`, ...((question.answers[1].isCorrect && highlightCorrect) && { highlight: "yellow", }) })]
                                            })],
                                            borders: {
                                                top: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                                bottom: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                                left: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                                right: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                            }
                                        }),
                                    ],
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            children: [new Paragraph({
                                                children: [new TextRun({ text: `C) ${question.answers[2].text}`, ...((question.answers[2].isCorrect && highlightCorrect) && { highlight: "yellow", }) })]
                                            })],
                                            borders: {
                                                top: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                                bottom: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                                left: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                                right: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                            }
                                        }),
                                        new TableCell({
                                            children: [new Paragraph({
                                                children: [new TextRun({ text: `D) ${question.answers[3].text}`, ...((question.answers[3].isCorrect && highlightCorrect) && { highlight: "yellow", }) })]
                                            })],
                                            borders: {
                                                top: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                                bottom: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                                left: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                                right: { style: BorderStyle.NONE, size: 0, color: "ffffff", },
                                            }
                                        }),
                                    ],
                                }),
                            ],
                            width: {
                                size: 9070,
                                type: WidthType.DXA,
                            }
                        }),
                    ];
                }).flat().flat(),

            ]
        }]
    });

    return doc;
}

export default GenerateExam;