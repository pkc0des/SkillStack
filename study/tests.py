from django.test import TestCase
from .models import StudySession, Subject
from accounts.models import Profile
from django.contrib.auth.models import User

from datetime import timedelta
from django.utils import timezone


# Create your tests here.

class StudySessionModelTestCase(TestCase):
    def setUp(self):
        alice_user = User.objects.create_user(
            username="Alice",
            email="Alice@gmail.com",
            password="12345678"
        )

        bob_user = User.objects.create_user(
            username="Bob",
            email="Bob@gmail.com",
            password="12345678",
        )

        self.alice = Profile.objects.create(user=alice_user)
        self.bob = Profile.objects.create(user=bob_user)
        self.mathematics = Subject.objects.create(
            name="Mathematics",
            color="Blue",
            active=True
        )
        self.programming = Subject.objects.create(
            name="Programming",
            color="Purple",
            active=True
        )
        self.science = Subject.objects.create(
            name="Science",
            color="Green",
            active=True
        )
        self.english_ss = Subject.objects.create(
            name="English/SS",
            color="Orange",
            active=True
        )

    def test_study_session_creation(self):
        start = timezone.now()
        StudySession.objects.create(
            user = self.alice,
            subject = self.programming,
            duration = 45,
            start_time = start,
            end_time = start + timedelta(minutes=45)
        )

        StudySession.objects.create(
            user = self.bob,
            subject = self.mathematics,
            duration = 60,
            start_time = start,
            end_time = start + timedelta(60)
        )

        self.assertEqual(self.alice.study_sessions.count(), 1) #type: ignore
        self.assertEqual(self.bob.study_sessions.count(), 1) #type: ignore

    
        