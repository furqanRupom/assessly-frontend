// constants/dummyData.ts

import type { Question } from "@/interfaces/assessment";
import { CompetencyLevel } from "./assessmentData";


export const DUMMY_QUESTIONS: Question[] = [
    {
        _id: '1',
        competency: 'Digital Communication',
        level: CompetencyLevel.A1,
        question: 'Which of the following is the most secure way to share sensitive information via email?',
        options: [
            'Send it in the email body directly',
            'Use a password-protected attachment',
            'Send it through social media',
            'Post it on a public forum'
        ],
        correctAnswer: 'Use a password-protected attachment'
    },
    {
        _id: '2',
        competency: 'Internet Navigation',
        level: CompetencyLevel.A1,
        question: 'What does "HTTPS" in a website URL indicate?',
        options: [
            'The website is faster',
            'The connection is secure and encrypted',
            'The website has more content',
            'It\'s a government website'
        ],
        correctAnswer: 'The connection is secure and encrypted'
    },
    {
        _id: '3',
        competency: 'Digital Productivity',
        level: CompetencyLevel.A2,
        question: 'Which keyboard shortcut is universally used to copy text in most applications?',
        options: [
            'Ctrl + V',
            'Ctrl + C',
            'Ctrl + X',
            'Ctrl + Z'
        ],
        correctAnswer: 'Ctrl + C'
    },
    {
        _id: '4',
        competency: 'Digital Security',
        level: CompetencyLevel.A2,
        question: 'What is the primary purpose of two-factor authentication (2FA)?',
        options: [
            'To make passwords longer',
            'To add an extra layer of security',
            'To remember passwords automatically',
            'To encrypt all data'
        ],
        correctAnswer: 'To add an extra layer of security'
    },
    {
        _id: '5',
        competency: 'Digital Collaboration',
        level: CompetencyLevel.B1,
        question: 'In a cloud-based document sharing system, what does "version control" help you manage?',
        options: [
            'File storage space',
            'Internet connection speed',
            'Changes and edits made to documents over time',
            'User access permissions only'
        ],
        correctAnswer: 'Changes and edits made to documents over time'
    },
    {
        _id: '6',
        competency: 'Digital Privacy',
        level: CompetencyLevel.B1,
        question: 'What should you do before sharing personal information on a website?',
        options: [
            'Check if the website looks professional',
            'Look for a privacy policy and understand how your data will be used',
            'Share only if the website has many users',
            'Assume all websites are safe for sharing information'
        ],
        correctAnswer: 'Look for a privacy policy and understand how your data will be used'
    },
    {
        _id: '7',
        competency: 'Digital Content Creation',
        level: CompetencyLevel.B2,
        question: 'Which file format is best for preserving document formatting across different devices?',
        options: [
            'TXT',
            'PDF',
            'DOCX',
            'RTF'
        ],
        correctAnswer: 'PDF'
    },
    {
        _id: '8',
        competency: 'Digital Problem Solving',
        level: CompetencyLevel.B2,
        question: 'What is the first step you should take when encountering a technical problem?',
        options: [
            'Restart your device',
            'Search online for solutions',
            'Identify the specific problem and error messages',
            'Contact technical support immediately'
        ],
        correctAnswer: 'Identify the specific problem and error messages'
    },
    {
        _id: '9',
        competency: 'Advanced Digital Skills',
        level: CompetencyLevel.C1,
        question: 'What does API stand for in software development?',
        options: [
            'Application Programming Interface',
            'Advanced Programming Instruction',
            'Automated Program Integration',
            'Application Process Integration'
        ],
        correctAnswer: 'Application Programming Interface'
    },
    {
        _id: '10',
        competency: 'Digital Leadership',
        level: CompetencyLevel.C2,
        question: 'What is the key consideration when implementing a new digital transformation strategy?',
        options: [
            'Choosing the latest technology available',
            'Ensuring employee training and change management',
            'Reducing costs as much as possible',
            'Implementing the strategy as quickly as possible'
        ],
        correctAnswer: 'Ensuring employee training and change management'
    },
    {
        _id: '11',
        competency: 'Data Management',
        level: CompetencyLevel.A1,
        question: 'What is the purpose of organizing files into folders?',
        options: [
            'To make your computer run faster',
            'To help find and manage files more easily',
            'To increase storage space',
            'To protect files from viruses'
        ],
        correctAnswer: 'To help find and manage files more easily'
    },
    {
        _id: '12',
        competency: 'Online Safety',
        level: CompetencyLevel.A2,
        question: 'What should you do if you receive a suspicious email asking for personal information?',
        options: [
            'Reply and ask for more details',
            'Click on links to verify the source',
            'Delete it without responding',
            'Forward it to friends to warn them'
        ],
        correctAnswer: 'Delete it without responding'
    }
];