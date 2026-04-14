# 📚 Textbooks Folder

Place your raw textbook source files here (PDF, DOCX, TXT, EPUB, etc.).

These files are **reference copies** — the AI teacher reads extracted text
from `src/data/curriculum.js`, not directly from these files.

## How to add a textbook

1. **Place the file** here (e.g. `english_file_b1.pdf`)
2. **Extract the text** using any tool:
   - PDF → copy text, or use an online PDF-to-text converter
   - DOCX → open in Word, select all, copy
   - EPUB → use Calibre or an online converter
3. **Open** `src/data/curriculum.js`
4. **Add** a new entry to the `textbooks` array with:
   - `id` — unique identifier
   - `title`, `author`, `level`
   - `methodology` — teaching approach description
   - `units` — structured lesson data (grammar, vocabulary, exercises)
   - `extractedText` — full text content pasted from the book
5. **Set** `activeTextbookId` to your textbook's `id`

The AI teacher will automatically use the active textbook for lessons.
