from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from config import Config

app = Flask(__name__)
CORS(app)

app.config.from_object(Config)
db = SQLAlchemy(app)

class Venta(db.Model):
    __tablename__ = 'ventas'
    id = db.Column(db.Integer, primary_key=True)
    nombre_cliente = db.Column(db.String(100))
    direccion = db.Column(db.String(200))
    telefono = db.Column(db.String(20))
    fecha_compra = db.Column(db.Date)
    total = db.Column(db.Numeric(10,2))

class DetalleVenta(db.Model):
    __tablename__ = 'detalle_ventas'
    id = db.Column(db.Integer, primary_key=True)
    venta_id = db.Column(db.Integer, db.ForeignKey('ventas.id'))
    tamano = db.Column(db.String(50))
    ingredientes = db.Column(db.String(200))
    num_pizzas = db.Column(db.Integer)
    subtotal = db.Column(db.Numeric(10,2))

@app.route('/api/ventas', methods=['POST'])
def registrar_venta():
    data = request.json
    try:
        nueva_venta = Venta(
            nombre_cliente=data['nombre'],
            direccion=data['direccion'],
            telefono=data['telefono'],
            fecha_compra=datetime.strptime(data['fecha'], '%Y-%m-%d').date(),
            total=data['total']
        )
        db.session.add(nueva_venta)
        db.session.commit()

        for detalle in data['detalles']:
            nuevo_detalle = DetalleVenta(
                venta_id=nueva_venta.id,
                tamano=detalle['tamano'],
                ingredientes=', '.join(detalle['ingredientes']),
                num_pizzas=detalle['num_pizzas'],
                subtotal=detalle['subtotal']
            )
            db.session.add(nuevo_detalle)
        db.session.commit()
        return jsonify({'mensaje': 'Venta registrada con éxito'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

# NUEVO ENDPOINT: Busca por día de la semana o mes del año
@app.route('/api/ventas/buscar/<string:criterio>', methods=['GET'])
def buscar_ventas(criterio):
    ventas = Venta.query.all()
    dias_semana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']
    meses_ano = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
    
    criterio = criterio.lower().strip()
    resultado = []
    total_busqueda = 0
    
    for v in ventas:
        fecha = v.fecha_compra
        nombre_dia = dias_semana[fecha.weekday()]
        nombre_mes = meses_ano[fecha.month - 1]
        
        # Si la palabra coincide con el día o con el mes de la venta, lo añadimos
        if criterio == nombre_dia or criterio == nombre_mes:
            resultado.append({'cliente': v.nombre_cliente, 'total': float(v.total)})
            total_busqueda += float(v.total)
    
    return jsonify({'ventas': resultado, 'total': total_busqueda})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)