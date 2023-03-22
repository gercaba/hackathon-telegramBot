# NuclioHackBot

 <h2>Telegram Bot that allows you to order food</h2>

<em>Reto realizado en el BootCamp de Nuclio Digital School en la Hackathon  en un grupo de 2-3 personas en 4 horas.</em>

El objetivo era utilizar un Bot de Telegram para poder seleccionar un menú en base a una oferta pre-establecida.</br>

Se realizar el desarrollo en Frontend para mostrar los menús y pedidos, una parte de backend que implementar los endpoints y la parte de "endpoints" de Telegram. Por último, se realiza mediante un Docker para simplificar la gestión de la BBDD.</br>

Mediante la librería de Telegraf se obtiene la conexión junto con los datos del usuario que se conecta.</br>
Una vez obtenidos los datos y en función de los comandos diseñados se muestran las opciones del menú permitiendo la selección con los botones correspondientes.</br>

En función de la selección, se transmite el pedido que se puede observar en el front el menú seleccionado, así como el usuario.</br>

Desde el front se permite marcar como completado. Dicho evento lo puede consultar el usaurio desde el Telegram. </br>


<h2>How to use </h2>

<p>Needed a .env file to define the folling environment variables:</p>
<ul>
<li>MONGO_URL</li>
<li>BOT_TOKEN</li>
</ul>
<p> Init the project using: </p>

Windows: </br>
<code>npx dotenv -- turbo run dev</code>

MacOs:</br>
Frontend:</br>
<code>npm run start:frontend</code></br>
Backend:</br>
<code>npm run start:backend</code>
# hackathon
