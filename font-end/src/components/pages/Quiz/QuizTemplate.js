const quizMockData = [ 
    [
        { question: 'Con nao nho nhat trong cac con vat nay ?', a: { content: 'con ga', value: 0}, b: { content: 'con heo', value: 1}, c: { content: 'con luon', value: 2}, d: { content: 'con chuot', value: 3}},
        { question: 'Con nao nho nhat trong cac con vat nay ?', a: { content: 'con ga', value: 0}, b: { content: 'con heo', value: 1}, c: { content: 'con luon', value: 2}, d: { content: 'con chuot', value: 3}},
        { question: 'Con nao nho nhat trong cac con vat nay ?', a: { content: 'con ga', value: 0}, b: { content: 'con heo', value: 1}, c: { content: 'con luon', value: 2}, d: { content: 'con chuot', value: 3}},
        { question: 'Con nao nho nhat trong cac con vat nay ?', a: { content: 'con ga', value: 0}, b: { content: 'con heo', value: 1}, c: { content: 'con luon', value: 2}, d: { content: 'con chuot', value: 3}},
        { question: 'Con nao nho nhat trong cac con vat nay ?', a: { content: 'con ga', value: 0}, b: { content: 'con heo', value: 1}, c: { content: 'con luon', value: 2}, d: { content: 'con chuot', value: 3}},
    ],
    [
        { question: 'Con nao nang ky nhat trong cac con vat nay ?', a: { content: 'con ga', value: 0}, b: { content: 'con heo', value: 1}, c: { content: 'con luon', value: 2}, d: { content: 'con ga', value: 3}},
        { question: 'Con nao nang ky nhat trong cac con vat nay ?', a: { content: 'con ga', value: 0}, b: { content: 'con heo', value: 1}, c: { content: 'con luon', value: 2}, d: { content: 'con ga', value: 3}},
        { question: 'Con nao nang ky nhat trong cac con vat nay ?', a: { content: 'con ga', value: 0}, b: { content: 'con heo', value: 1}, c: { content: 'con luon', value: 2}, d: { content: 'con ga', value: 3}},
        { question: 'Con nao nang ky nhat trong cac con vat nay ?', a: { content: 'con ga', value: 0}, b: { content: 'con heo', value: 1}, c: { content: 'con luon', value: 2}, d: { content: 'con ga', value: 3}},
        { question: 'Con nao nang ky nhat trong cac con vat nay ?', a: { content: 'con ga', value: 0}, b: { content: 'con heo', value: 1}, c: { content: 'con luon', value: 2}, d: { content: 'con ga', value: 3}},
    ],
];

const resultMockData = [
    [3, 3, 3, 3, 3],
    [1, 1, 1, 1, 1]
];

const QuizTemplate = () => {
    return (
        <div>
            <h1> Bài kiểm tra</h1>
            {
                quizMockData[0].map(
                    quiz => {
                        <h4>{quiz.question}</h4>
                        
                    }
                )
            }
        </div>
    )
};

export default QuizTemplate;