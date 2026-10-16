from django.test import TestCase

from accounts.models import Profile
from django.contrib.auth.models import User

from datetime import timedelta
from django.utils import timezone
from .models import StudySession, Subject
from .utils import format_minutes_to_hours_minutes, minutes_studied_this_week, minutes_studied_today


# Create your tests here.

class BaseStudyTestCase(TestCase):
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

        self.alice_user = alice_user
        self.bob_user = bob_user

class FormatMinutesTestCase(TestCase):
    def test_under_an_hour(self):
        formatted_45_mins = format_minutes_to_hours_minutes(45)
        self.assertEqual(formatted_45_mins, "45 minutes")

    def test_exactly_hoours(self):
        formatted_120_mins = format_minutes_to_hours_minutes(120)
        self.assertEqual(formatted_120_mins, "2 hours")

    def test_hours_and_minutes(self):
        formatted_105_minutes = format_minutes_to_hours_minutes(105)
        self.assertEqual(formatted_105_minutes, "1 hour 45 minutes")

    def test_zero(self):
        formatted_0 = format_minutes_to_hours_minutes(0)
        self.assertEqual(formatted_0, "0 minutes")

class HoursStudiedTestCase(BaseStudyTestCase):
    def test_sums_sessions_this_week(self):
        end = timezone.now()
        StudySession.objects.create(
            user=self.alice,
            subject=self.programming,
            duration=30,
            start_time=end - timedelta(minutes=30),
            end_time=end
        )
        self.assertEqual(minutes_studied_this_week(self.alice_user), 30)
        self.assertEqual(minutes_studied_today(self.alice_user), 30)

        StudySession.objects.create(
            user=self.alice,
            subject=self.programming,
            duration=45,
            start_time=end - timedelta(minutes=45),
            end_time=end
        )

        self.assertEqual(minutes_studied_this_week(self.alice_user), 75)
        self.assertEqual(minutes_studied_today(self.alice_user), 75)

    def test_ignores_old_sessions(self):
        start = timezone.now() - timedelta(days=10)
        StudySession.objects.create(
            user=self.alice,
            subject=self.programming,
            duration=45,
            start_time=start,
            end_time=start + timedelta(hours=2)
        )

        self.assertEqual(minutes_studied_this_week(self.alice_user), 0)
        self.assertEqual(minutes_studied_today(self.alice_user), 0)
        


class StudySessionModelTestCase(BaseStudyTestCase):
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
            end_time = start + timedelta(minutes=60)
        )

        self.assertEqual(self.alice.study_sessions.count(), 1) #type: ignore
        self.assertEqual(self.bob.study_sessions.count(), 1) #type: ignore

    
        