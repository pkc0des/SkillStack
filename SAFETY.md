# Basic Security for SkillStack

SkillStack is designed primarily for local hosting and educational use. If you plan to use it in a production environment, additional security measures will be required.

## Local Hosting Guidelines

1. Keep your Google Gemini API key secure by storing it in environment variables rather than hardcoding it.
2. Keep sensitive configuration values, such as Django's `SECRET_KEY`, private. Generate your own unique secret key rather than reusing the development key.
3. Do not commit `.env` files, virtual environments, databases containing user data, or other sensitive files to GitHub.
4. Keep your dependencies updated and use strong passwords for user accounts.
5. Understand that SkillStack may contain bugs or security vulnerabilities. Review its configuration and protect your data before using or modifying the application.

## Production Rules

**SkillStack is not currently configured or audited for public production deployment.**

If you intend to deploy SkillStack publicly:

1. Follow all of the local security guidelines above.
2. Set `DEBUG = False` and securely configure `SECRET_KEY` using environment variables.
3. Properly configure `ALLOWED_HOSTS`, HTTPS, secure cookies, and other necessary Django security settings.
4. Evaluate whether SQLite meets your deployment requirements or whether another database, such as PostgreSQL, would be more appropriate.
5. Use a production-ready web server instead of Django's development server.
6. Review the application for security vulnerabilities, protect user data, and test the deployment before allowing public access.
7. Consult Django's official deployment documentation and run `python manage.py check --deploy` with your production settings.

## Additional Resources

Refer to the [official Django deployment checklist](https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/) for more information about securely deploying Django applications.

**Anyone deploying or modifying SkillStack is responsible for reviewing its security configuration and protecting user data.**

**This file was rephrased by ChatGPT to ensure that all of this informaiton is accurate**
