class Config:
    SECRET_KEY = 'behappy'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///medicalwebexperts.sqlite3'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'behappyjwt'
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ['access']
