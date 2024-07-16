import os
from googletrans import Translator

# Укажите путь к директории с файлами
directory = 'D:\\Repos\\vrgo\\source\\assets\\images\\patology'
directory_to_json = 'D:\\Repos\\vrgo\\source\\scripts\\descriptionOfExercises\\allExercises.tsx'

# Инициализируйте переводчик
translator = Translator()

# Функция для чтения и замены текста в файле
def replace_in_file(file_path, old_text, new_text):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    content = content.replace(old_text, new_text)

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)

# Перебирайте все файлы в директории
for filename in os.listdir(directory):
    # Получите путь к файлу
    filepath = os.path.join(directory, filename)

    # Пропустите директории, обработайте только файлы
    if os.path.isfile(filepath):
        # Разделите имя файла и расширение
        file_root, file_ext = os.path.splitext(filename)

        # Переведите только имя файла без расширения
        translated_root = translator.translate(file_root, src='ru', dest='en').text
        
        # Выведите предложенный перевод и запросите подтверждение или редактирование
        print(f"Исходное название: {file_root}{file_ext}")
        print(f"Предложенный перевод: {translated_root}{file_ext}")
        user_input = input("Подтвердите перевод или введите своё значение (оставьте пустым для принятия предложенного перевода): ")
        
        # Если пользователь ввёл свой вариант, используйте его
        if user_input.strip():
            translated_root = user_input.strip()

        # Сформируйте новое имя файла с сохранением расширения
        new_filename = translated_root + file_ext
        new_filepath = os.path.join(directory, new_filename)

        # Переименуйте файл
        os.rename(filepath, new_filepath)
        print(f'Файл {filename} переименован в {new_filename}')

        # Если это текстовый файл, замените вхождение названия внутри него
        if file_ext == '.png':
            replace_in_file(directory_to_json, filename, new_filename)
            print(f'Вхождение {filename} заменено на {new_filename} в {directory_to_json}')
