from django.db import models

ACCOUNT_TYPE_CHOICES = (
    ('Fb','Facebook'),
    ('Ggl', 'Google')
)


class SheeterUser(models.Model):
    user_id = models.CharField(max_length=200, verbose_name='Id_ user', primary_key=True)
    name = models.CharField(max_length=200, verbose_name='Nom')
    account_type = models.CharField(max_length=200, 
                                    verbose_name='Type_compte',
                                    choices=ACCOUNT_TYPE_CHOICES)            
    email = models.EmailField(verbose_name="Email")
    profile_pic = models.TextField(verbose_name="url_profile_pic")
