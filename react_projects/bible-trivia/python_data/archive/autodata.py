import openai
import os

# Set your OpenAI API key from the environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")  # Ensure this environment variable is set

def generate_bible_questions(book_name, chapter, n):
    """
    Generates structured JSON-like data for Bible questions using OpenAI's ChatCompletion API.

    Parameters:
        book_name (str): The name of the Bible book.
        chapter (int): The chapter number.
        n (int): Number of questions per difficulty level (easy, medium, hard).

    Returns:
        str: The generated questions in JSON-like format.
    """
    # Define the system prompt to set the context
    system_prompt = {
        "role": "system",
        "content": (
            "You are an assistant that generates Bible quiz questions. "
            "Provide the output in a structured JSON-like format."
        )
    }

    # Define the user prompt with instructions
    user_prompt = {
        "role": "user",
        "content": (
            f"Generate {n} easy, {n} medium, and {n} hard Bible questions from the book of {book_name}, Chapter {chapter}. "
            "Each question should have the following fields: id, book, chapter, question, options, answer, level, and hint "
            f"(in the form {book_name} {chapter}:Y). The id should be a combination of the chapter, difficulty level, and an integer. "
            "Generate data for easy, medium, and hard questions with ids like \"{chapter}-easy-1\", \"{chapter}-medium-1\", and \"{chapter}-hard-1\". "
            "Here's an example of the format for one question:\n\n"
            "{\n"
            f"  id: '{chapter}-easy-1',\n"
            f"  book: '{book_name}',\n"
            f"  chapter: {chapter},\n"
            f"  question: 'Who baptized Jesus in the Jordan River?',\n"
            f"  options: ['John the Baptist', 'Peter', 'James', 'Andrew'],\n"
            f"  answer: 'John the Baptist',\n"
            f"  level: 'easy',\n"
            f"  hint: '{book_name} {chapter}:9'\n"
            "}\n\n"
            "Now generate the questions in this format."
        )
    }

    # Combine the messages for the ChatCompletion API
    messages = [system_prompt, user_prompt]

    try:
        # Make the API call to OpenAI ChatCompletion
        response = openai.ChatCompletion.create(
            model="gpt-4",  # You can use "gpt-3.5-turbo" or another supported model
            messages=messages,
            temperature=0.7,
            max_tokens=3000  # Adjust based on the expected length of the response
        )

        # Extract the assistant's reply
        chat_completion = response['choices'][0]['message']['content']

        # Optional: Validate or format the JSON-like response here
        return chat_completion.strip()

    except openai.error.OpenAIError as e:
        print(f"An error occurred while generating questions: {e}")
        return None

def save_to_jsx_file(content, book_name, chapter):
    """
    Saves the generated questions to a JSX file.

    Parameters:
        content (str): The JSON-like content containing the questions.
        book_name (str): The name of the Bible book.
        chapter (int): The chapter number.
    """
    # Sanitize the book name to create a valid variable and filename
    sanitized_book_name = ''.join(e for e in book_name if e.isalnum()).lower()
    file_name = f"{sanitized_book_name}{chapter}.jsx"

    # Define the contents of the .jsx file
    jsx_content = f"""
// Auto-generated questions for {book_name} Chapter {chapter}
const {sanitized_book_name}{chapter} = {content}

export default {sanitized_book_name}{chapter};
"""

    # Save the content to a .jsx file
    try:
        with open(file_name, 'w') as file:
            file.write(jsx_content)
        print(f"File '{file_name}' has been successfully created!")
    except IOError as e:
        print(f"An error occurred while writing to the file: {e}")

def main():
    """
    Main function to execute the script.
    """
    # Input from the user
    book_name = input("Enter the book name: ").strip()
    chapter_input = input("Enter the chapter: ").strip()
    n_input = input("Enter the number of questions per difficulty level: ").strip()

    # Validate and convert inputs
    if not book_name:
        print("Book name cannot be empty.")
        return

    try:
        chapter = int(chapter_input)
        n = int(n_input)
    except ValueError:
        print("Chapter and number of questions must be integers.")
        return

    # Generate the Bible questions
    print("Generating questions...")
    bible_questions = generate_bible_questions(book_name, chapter, n)

    if bible_questions:
        # Save the generated questions as a .jsx file
        save_to_jsx_file(bible_questions, book_name, chapter)
    else:
        print("Failed to generate Bible questions.")

if __name__ == "__main__":
    main()