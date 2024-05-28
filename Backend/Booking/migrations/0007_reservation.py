# Generated by Django 5.0.3 on 2024-03-30 14:24

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Booking', '0006_alter_destination_imageurl'),
    ]

    operations = [
        migrations.CreateModel(
            name='Reservation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reservationDate', models.DateField()),
                ('startDate', models.DateField()),
                ('endDate', models.DateField()),
                ('noNights', models.IntegerField()),
                ('totalPrice', models.DecimalField(decimal_places=2, max_digits=10)),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Booking.user')),
                ('destination', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Booking.destination')),
            ],
        ),
    ]