from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class AuthLoginTests(APITestCase):
    def setUp(self):
        self.login_url = reverse('auth-login')
        self.me_url = reverse('auth-me')
        self.admin = User.objects.create_user(
            username='admin',
            password='admin123',
            is_staff=True,
        )
        self.regular_user = User.objects.create_user(
            username='user',
            password='user123',
            is_staff=False,
        )

    def test_login_success_with_staff_user(self):
        response = self.client.post(
            self.login_url,
            {'username': 'admin', 'password': 'admin123'},
            format='json',
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        self.assertEqual(response.data['username'], 'admin')

    def test_login_invalid_credentials(self):
        response = self.client.post(
            self.login_url,
            {'username': 'admin', 'password': 'wrong'},
            format='json',
        )

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data['message'], 'Credenciales inválidas')

    def test_login_rejects_non_staff_user(self):
        response = self.client.post(
            self.login_url,
            {'username': 'user', 'password': 'user123'},
            format='json',
        )

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(response.data['message'], 'Acceso restringido a administradores')

    def test_me_with_valid_token(self):
        login_response = self.client.post(
            self.login_url,
            {'username': 'admin', 'password': 'admin123'},
            format='json',
        )
        access_token = login_response.data['access']

        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        response = self.client.get(self.me_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], 'admin')
        self.assertTrue(response.data['is_staff'])
