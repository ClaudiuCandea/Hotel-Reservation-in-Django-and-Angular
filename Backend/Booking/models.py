from django.db import models



class User(models.Model):
    CLIENT = 'CLIENT'
    AGENT = 'AGENT'

    ROLE_CHOICES = [
        (CLIENT, 'Client'),
        (AGENT, 'Agent')
    ]

    name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.EmailField(max_length=100,unique=True)
    role = models.CharField(max_length=100,choices=ROLE_CHOICES)

    def __str__(self):
        return self.name + " " + self.email + " " + self.password + self.role

class Destination(models.Model):
    title = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    pricePerNight = models.DecimalField(max_digits=10,decimal_places=2)
    freeRooms = models.IntegerField()
    description = models.TextField(max_length=1000)
    offer = models.IntegerField(default=0)
    imageUrl = models.TextField()

    def __str__(self):
        return self.title + " " + self.location + " " + self.pricePerNight

class Reservation(models.Model):
    destination = models.ForeignKey(Destination,on_delete=models.CASCADE)
    client = models.ForeignKey(User, on_delete=models.CASCADE)
    reservationDate = models.DateField()
    startDate = models.DateField()
    endDate = models.DateField()
    noNights = models.IntegerField()
    totalPrice = models.DecimalField(max_digits=10,decimal_places=2)

