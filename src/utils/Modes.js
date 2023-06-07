import { sha256 } from 'js-sha256';

const modes = [
    { label: "Secret Key & Exam Key", description: "Uses a Secret Key and an unique Exam Key to generate the answers.", secretKey: true, examKey: true, examDate: false, studentsNames: false, mainShaAlgorithm: (secretKey, examKey) => sha256(secretKey + examKey) },
    { label: "Secret Key & Exam Date", description: "Uses a Secret Key and the Exam Date to generate the answers.", secretKey: true, examKey: false, examDate: true, studentsNames: false, mainShaAlgorithm: (secretKey, examKey) => sha256(secretKey + examKey) },
    { label: "Secret Key & Student Name", description: "Uses a Secret Key and the Student Name to generate the answers.", secretKey: true, examKey: false, examDate: false, studentsNames: true, mainShaAlgorithm: (secretKey, examKey) => sha256(secretKey + examKey) },
    { label: "Secret Key", description: "Uses a Secret Key to generate the answers.", secretKey: true, examKey: false, examDate: false, studentsNames: false, mainShaAlgorithm: (secretKey, examKey) => sha256(secretKey + examKey) },
    { label: "Exam Key", description: "Uses the Exam Key to generate the answers.", secretKey: false, examKey: true, examDate: false, studentsNames: false, mainShaAlgorithm: (secretKey, examKey) => sha256(secretKey + examKey) }
];

export default modes;