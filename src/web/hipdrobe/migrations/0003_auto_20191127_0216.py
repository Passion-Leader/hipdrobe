# Generated by Django 2.2.7 on 2019-11-26 17:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hipdrobe', '0002_auto_20191127_0214'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='userpw',
            new_name='userpwd',
        ),
    ]
