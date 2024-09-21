import openai
import os

# Set your OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")  # Replace this with your actual API key if not using environment variables

def generate_bible_questions(book_name, chapter, n, difficulty_level):
    # Prompt to instruct GPT to generate structured JSON-like data for n questions at the given difficulty level
    prompt = f"""
    Generate {n} Bible questions from the book of {book_name}, Chapter {chapter} with a difficulty level of {difficulty_level}.
    Each question should have the following fields: id, book, chapter, question, options, answer, level, and hint (in the form {book_name} {chapter}:Y).
    The id should be a combination of the chapter, difficulty level, and an integer.
    Generate data for questions with ids like "{chapter}-{difficulty_level}-1", "{chapter}-{difficulty_level}-2", and so on.
    Here's an example of the format for one question:

    {{
      id: '{chapter}-{difficulty_level}-1',
      book: '{book_name}',
      chapter: {chapter},
      question: 'Who baptized Jesus in the Jordan River?',
      options: ['John the Baptist', 'Peter', 'James', 'Andrew'],
      answer: 'John the Baptist',
      level: '{difficulty_level}',
      hint: '{book_name} {chapter}:9'
    }}

    Now generate {n} {difficulty_level} questions in this format.
    """

    response = openai.Completion.create(
        engine="text-davinci-003",  # You can use "gpt-3.5-turbo" or another model
        prompt=prompt,
        max_tokens=3000,  # Adjust this based on how many tokens you need
        temperature=0.7,
        n=1,
        stop=["\n\n"]  # To end the response after one block of output
    )

    return response.choices[0].text.strip()

def save_to_jsx_file(content, book_name, chapter, difficulty_level):
    # Create a valid filename using book_name, chapter, and difficulty_level
    file_name = f"{book_name}{chapter}_{difficulty_level}.jsx"

    # Define the contents of the .jsx file
    jsx_content = f"""
    // Auto-generated {difficulty_level} questions for {book_name} Chapter {chapter}
    const {book_name.lower()}{chapter}_{difficulty_level} = {content}

    export default {book_name.lower()}{chapter}_{difficulty_level};
    """

    # Save the content to a .jsx file
    with open(file_name, 'w') as file:
        file.write(jsx_content)
    print(f"File {file_name} has been successfully created!")

# Input from the user
book_name = input("Enter the book name: ")
chapter = input("Enter the chapter: ")
n = int(input("Enter the number of questions to generate: "))
difficulty_level = input("Enter the difficulty level (easy, medium, hard): ").lower()

# Generate the Bible questions
bible_questions = generate_bible_questions(book_name, chapter, n, difficulty_level)

# Save the generated questions as a .jsx file
save_to_jsx_file(bible_questions, book_name, chapter, difficulty_level)