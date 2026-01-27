"""
MongoDB Database Population Script for Web Novel Platform
This script generates fake novels, chapters, and users for testing purposes.
"""

import os
import sys
from datetime import datetime, timedelta
from pymongo import MongoClient
from bson import ObjectId
import random
from faker import Faker
import bcrypt

# Initialize Faker
fake = Faker()

# MongoDB connection
MONGODB_URI = "mongodb://localhost:27017/novel-platform"

# Constants from the backend
NOVEL_STATUS = {
    'ONGOING': 'ongoing',
    'COMPLETED': 'completed',
    'HIATUS': 'hiatus',
    'DELETED': 'deleted'
}

CONTENT_STATUS = {
    'DRAFT': 'draft',
    'PUBLISHED': 'published'
}

ROLES = {
    'ADMIN': 'admin',
    'USER': 'user',
    'AUTHOR': 'author'
}

STATUS = {
    'ACTIVE': 'active',
    'INACTIVE': 'inactive',
    'PENDING': 'pending',
    'BLOCKED': 'blocked',
    'DELETED': 'deleted'
}

# Genre options
GENRES = [
    'Fantasy', 'Science Fiction', 'Kryminał', 'Thriller', 'Romans',
    'Horror', 'Przygoda', 'Historyczny', 'Dramat', 'Komedia',
    'Akcja', 'Okruchy życia', 'Nadprzyrodzony', 'Sportowy', 'Psychologiczny'
]

# Sample tags
TAGS = [
    'Magic', 'Dragons', 'Time Travel', 'Reincarnation', 'System',
    'Cultivation', 'Academy', 'Revenge', 'Overpowered MC', 'Weak to Strong',
    'Romance', 'Harem', 'Mystery', 'Adventure', 'Action',
    'Slice of Life', 'Comedy', 'Tragedy', 'Dark', 'Light-hearted'
]

# Novel title templates
NOVEL_TITLE_TEMPLATES = [
    "The {adjective} {noun}",
    "{noun} of {place}",
    "Chronicles of the {adjective} {noun}",
    "The {noun}'s {journey}",
    "Rise of the {adjective} {noun}",
    "Legend of {place}",
    "The {adjective} Path",
    "Tales from {place}",
    "The Last {noun}",
    "Secrets of the {adjective} {noun}",
    "Journey to {place}",
    "The {noun} Chronicles",
    "Realm of {adjective} {noun}",
    "The {adjective} Saga",
    "Echoes of {place}"
]

ADJECTIVES = [
    'Eternal', 'Forgotten', 'Ancient', 'Divine', 'Cursed',
    'Sacred', 'Fallen', 'Rising', 'Hidden', 'Lost',
    'Legendary', 'Mystic', 'Dark', 'Crimson', 'Silver'
]

NOUNS = [
    'Emperor', 'Warrior', 'Mage', 'Dragon', 'Phoenix',
    'Sword', 'Crown', 'Throne', 'Kingdom', 'Empire',
    'Hero', 'Demon', 'God', 'Spirit', 'Guardian'
]

PLACES = [
    'Avalon', 'Elysium', 'Valhalla', 'Asgard', 'Olympus',
    'the Void', 'the Abyss', 'the Heavens', 'the Underworld', 'Eternity'
]

JOURNEYS = [
    'Journey', 'Quest', 'Destiny', 'Legacy', 'Awakening',
    'Ascension', 'Redemption', 'Revenge', 'Trial', 'Adventure'
]


def generate_novel_title():
    """Generate a random novel title"""
    template = random.choice(NOVEL_TITLE_TEMPLATES)
    return template.format(
        adjective=random.choice(ADJECTIVES),
        noun=random.choice(NOUNS),
        place=random.choice(PLACES),
        journey=random.choice(JOURNEYS)
    )


def generate_novel_description():
    """Generate a random novel description"""
    descriptions = [
        f"In a world where {fake.word()} reigns supreme, {fake.first_name()} must navigate the treacherous path of {fake.word()} to uncover the truth about their {fake.word()}.",
        f"When {fake.first_name()} discovers they possess the power of {fake.word()}, their life is forever changed. Now they must face the {fake.word()} and save the realm from destruction.",
        f"A tale of {fake.word()}, {fake.word()}, and {fake.word()} set in a world where nothing is as it seems.",
        f"{fake.first_name()} was just an ordinary {fake.job()} until the day they stumbled upon a {fake.word()} that would change everything.",
        f"In the {fake.word()} empire, {fake.first_name()} rises from nothing to become the most {fake.word()} {fake.job()} the world has ever seen.",
        f"After being betrayed by those they trusted most, {fake.first_name()} embarks on a journey of {fake.word()} and {fake.word()}.",
        f"The {fake.word()} has been sealed for a thousand years. Now, {fake.first_name()} must prevent its awakening before it's too late.",
        f"Born with a {fake.word()} that everyone fears, {fake.first_name()} must prove their worth in a world that wants them dead.",
    ]
    return random.choice(descriptions)


def generate_chapter_title(chapter_number):
    """Generate a chapter title"""
    templates = [
        f"Chapter {chapter_number}: {fake.catch_phrase()}",
        f"Chapter {chapter_number}: The {random.choice(ADJECTIVES)} {random.choice(NOUNS)}",
        f"Chapter {chapter_number}: {fake.bs().title()}",
        f"Chapter {chapter_number}: {random.choice(['Awakening', 'Discovery', 'Battle', 'Revelation', 'Journey', 'Trial', 'Encounter', 'Escape'])}",
    ]
    return random.choice(templates)


def generate_chapter_content():
    """Generate random chapter content"""
    paragraphs = []
    num_paragraphs = random.randint(15, 30)
    
    for _ in range(num_paragraphs):
        sentences = []
        num_sentences = random.randint(3, 8)
        for _ in range(num_sentences):
            sentences.append(fake.sentence(nb_words=random.randint(8, 20)))
        paragraphs.append(' '.join(sentences))
    
    return '\n\n'.join(paragraphs)


def hash_password(password):
    """Hash a password using bcrypt"""
    salt = bcrypt.gensalt(12)
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')


def create_users(db, num_users=20):
    """Create fake users (authors and readers)"""
    print(f"Creating {num_users} users...")
    users_collection = db['users']
    
    # Clear existing users (optional - comment out if you want to keep existing data)
    # users_collection.delete_many({})
    
    users = []
    
    for i in range(num_users):
        # Calculate age between 18 and 70
        age = random.randint(18, 70)
        date_of_birth = datetime.now() - timedelta(days=age * 365 + random.randint(0, 365))
        
        user = {
            'email': fake.unique.email(),
            'username': fake.unique.user_name()[:20],  # Max 20 chars
            'password': hash_password('password123'),  # Default password for testing
            'dateOfBirth': date_of_birth,
            'role': ROLES['AUTHOR'] if i < num_users * 0.6 else ROLES['USER'],  # 60% authors
            'status': STATUS['ACTIVE'],
            'lastLogin': datetime.now() - timedelta(days=random.randint(0, 30)),
            'failedLoginAttempts': 0,
            'lockUntil': None,
            'createdAt': datetime.now() - timedelta(days=random.randint(30, 365)),
            'updatedAt': datetime.now() - timedelta(days=random.randint(0, 30))
        }
        users.append(user)
    
    result = users_collection.insert_many(users)
    print(f"Created {len(result.inserted_ids)} users")
    return result.inserted_ids


def create_novels(db, author_ids, num_novels=50):
    """Create fake novels"""
    print(f"Creating {num_novels} novels...")
    novels_collection = db['novels']
    
    # Clear existing novels (optional)
    # novels_collection.delete_many({})
    
    novels = []
    
    for i in range(num_novels):
        # Random creation date within the last year
        created_at = datetime.now() - timedelta(days=random.randint(1, 365))
        
        # Generate ratings
        num_ratings = random.randint(0, 50)
        ratings = []
        for _ in range(num_ratings):
            ratings.append({
                'user': random.choice(author_ids),
                'value': random.randint(1, 5),
                'createdAt': created_at + timedelta(days=random.randint(1, 30))
            })
        
        # Calculate average rating
        avg_rating = sum(r['value'] for r in ratings) / len(ratings) if ratings else 0
        
        novel = {
            'title': generate_novel_title(),
            'description': generate_novel_description(),
            'author': random.choice(author_ids),
            'genres': random.sample(GENRES, k=random.randint(1, 3)),
            'tags': random.sample(TAGS, k=random.randint(2, 5)),
            'status': random.choice([
                NOVEL_STATUS['ONGOING'],
                NOVEL_STATUS['ONGOING'],
                NOVEL_STATUS['ONGOING'],  # More ongoing novels
                NOVEL_STATUS['COMPLETED'],
                NOVEL_STATUS['HIATUS']
            ]),
            'totalChapters': 0,  # Will be updated when chapters are created
            'viewCount': random.randint(100, 50000),
            'ratings': ratings,
            'calculatedStats': {
                'averageRating': avg_rating,
                'ratingCount': len(ratings)
            },
            'isFeatured': random.random() < 0.1,  # 10% chance of being featured
            'createdAt': created_at
        }
        novels.append(novel)
    
    result = novels_collection.insert_many(novels)
    print(f"Created {len(result.inserted_ids)} novels")
    return result.inserted_ids


def create_chapters(db, novel_ids, min_chapters=5, max_chapters=50):
    """Create fake chapters for novels"""
    print(f"Creating chapters for {len(novel_ids)} novels...")
    chapters_collection = db['chapters']
    novels_collection = db['novels']
    
    # Clear existing chapters (optional)
    # chapters_collection.delete_many({})
    
    total_chapters_created = 0
    
    for novel_id in novel_ids:
        num_chapters = random.randint(min_chapters, max_chapters)
        chapters = []
        
        # Get novel creation date
        novel = novels_collection.find_one({'_id': novel_id})
        novel_created_at = novel['createdAt']
        
        for chapter_num in range(1, num_chapters + 1):
            # Chapters are published progressively after novel creation
            days_after_creation = (chapter_num - 1) * random.randint(1, 7)
            created_at = novel_created_at + timedelta(days=days_after_creation)
            
            content = generate_chapter_content()
            word_count = len(content.split())
            estimated_read_time = max(1, word_count // 200)  # 200 words per minute
            
            chapter = {
                'novelId': novel_id,
                'chapterNumber': chapter_num,
                'title': generate_chapter_title(chapter_num),
                'content': content,
                'status': CONTENT_STATUS['PUBLISHED'] if chapter_num <= num_chapters * 0.9 else CONTENT_STATUS['DRAFT'],
                'readCount': random.randint(50, 10000) if chapter_num <= num_chapters * 0.9 else 0,
                'wordCount': word_count,
                'estimatedReadTime': estimated_read_time,
                'createdAt': created_at,
                'lastUpdatedAt': created_at + timedelta(hours=random.randint(0, 24))
            }
            chapters.append(chapter)
        
        if chapters:
            chapters_collection.insert_many(chapters)
            # Update novel's totalChapters
            published_count = sum(1 for c in chapters if c['status'] == CONTENT_STATUS['PUBLISHED'])
            novels_collection.update_one(
                {'_id': novel_id},
                {'$set': {'totalChapters': published_count}}
            )
            total_chapters_created += len(chapters)
    
    print(f"Created {total_chapters_created} chapters")


def main():
    """Main function to populate the database"""
    print("=" * 60)
    print("Web Novel Platform - Database Population Script")
    print("=" * 60)
    print()
    
    # Connect to MongoDB
    try:
        client = MongoClient(MONGODB_URI)
        db = client.get_database()
        print(f"Connected to MongoDB: {db.name}")
        print()
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
        sys.exit(1)
    
    # Configuration
    num_users = int(input("Number of users to create (default 20): ") or "20")
    num_novels = int(input("Number of novels to create (default 50): ") or "50")
    min_chapters = int(input("Minimum chapters per novel (default 5): ") or "5")
    max_chapters = int(input("Maximum chapters per novel (default 50): ") or "50")
    
    print()
    print("Starting database population...")
    print()
    
    # Create data
    user_ids = create_users(db, num_users)
    print()
    
    novel_ids = create_novels(db, user_ids, num_novels)
    print()
    
    create_chapters(db, novel_ids, min_chapters, max_chapters)
    print()
    
    # Print summary
    print("=" * 60)
    print("Database Population Complete!")
    print("=" * 60)
    print(f"Total Users: {db['users'].count_documents({})}")
    print(f"Total Novels: {db['novels'].count_documents({})}")
    print(f"Total Chapters: {db['chapters'].count_documents({})}")
    print()
    print("Default password for all users: password123")
    print()
    
    # Close connection
    client.close()


if __name__ == "__main__":
    main()
