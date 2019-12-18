import sys
import pytesseract
from PIL import Image
import argparse


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Transform an image into text (preview for a ocr web api)")
    parser.add_argument("image", type=str, help="link to an image")
    pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
    args = parser.parse_args()
    sys.stdout.write(pytesseract.image_to_string(Image.open(args.image)))
    
