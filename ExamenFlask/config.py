class Config:
    # URI de conexión con usuario y contraseña root
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:root@localhost/pizzeria_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False