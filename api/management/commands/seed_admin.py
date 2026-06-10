from django.contrib.auth.models import User
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Crea o actualiza el superusuario admin / admin para desarrollo'

    def handle(self, *args, **options):
        username = 'admin'
        password = 'admin'
        email = 'admin@ruta8.local'

        user, created = User.objects.get_or_create(
            username=username,
            defaults={'email': email, 'is_staff': True, 'is_superuser': True},
        )
        user.email = email
        user.is_staff = True
        user.is_superuser = True
        user.set_password(password)
        user.save()

        if created:
            self.stdout.write(self.style.SUCCESS(f'Superusuario "{username}" creado.'))
        else:
            self.stdout.write(self.style.SUCCESS(f'Superusuario "{username}" actualizado.'))

        self.stdout.write('Credenciales: admin / admin')
