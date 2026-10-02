from django import forms
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
import django.utils.timezone
from datetime import datetime

class LogHoursForm(forms.Form):
    subject = forms.CharField(max_length=20)
    start_time = forms.DateTimeField()
    end_time = forms.DateTimeField()

    def clean(self):
        cleaned_data = super().clean()

        start_time = cleaned_data.get('start_time')
        end_time = cleaned_data.get('end_time')

        if start_time and end_time:
            if end_time <= start_time:
                raise ValidationError(
                    _("%(start_time)s is greater than %(end_time)s"),
                    params={"start_time": start_time, "end_time": end_time},
                    code="invalid"
                )
            if start_time > django.utils.timezone.now():
                raise ValidationError(
                    _("%(start_time)s is greater than %(now)s"),
                    params={"start_time": start_time, "now": django.utils.timezone.now()},
                    code="invalid"
                )
            
            duration = ((end_time - start_time).total_seconds()) / (60 * 60)

            if duration >= 16:
                raise ValidationError(
                    _("%(duration)s is greater than 12 hours"),
                    params={"duration": duration},
                    code="invalid"
                )
            