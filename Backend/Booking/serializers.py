from rest_framework import serializers
from Booking.models import Destination, User, Reservation


class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = ['id','title','location','pricePerNight','freeRooms','description','offer', 'imageUrl']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','name','password','email','role']

class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email','password']

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['id', 'destination', 'client', 'reservationDate', 'startDate', 'endDate', 'noNights', 'totalPrice']