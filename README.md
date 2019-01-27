# aquiles

Canvas editor


No third part libraries.


LIVE checking on all parametres, with messages if some of them is incorrect or the opposite.



Popups if Total Length of segments or degree is higher than allowed.



Especificaciones



Definición del estándar


Nuestro nuevo estándar para definición de barras de acero es bastante sencillo, básicamente describe la barra como una sucesión de segmentos rectos indicando el ángulo que hay entre cada segmento y el siguiente.


El código tiene la siguiente estructura:


 <h1>La cadena AQW# como inicio.</h1>
 Una sucesión de segmentos descritos con su ángulo de giro inicial y su longitud:
 
 
 <b>El símbolo @ precede al ángulo de la barra en grados sexagesimales y sin decimales.</b>

 
 
 <b>El símbolo L precede a la longitud del segmente en centímetros, también sin decimales.</b>

 
 
 <b>El símbolo # como final del código.</b>
 
 
El ángulo del primer segmento define la orientación del primer segmento, mientras que los
demás ángulos indican el giro del siguiente segmento con respecto al anterior.


A continuación, se muestran algunos ejemplos con su visualización. El punto gris sólo indica el inicio de la barra, no deberá mostrarse en la visualización.



<h1>Validaciones</h1>


Las validaciones serán una de las funcionalidades clave del producto final pero en esta primera fase sólo contemplaremos algunas básicas.


Las validaciones previstas son:


 <b>#1 El código de la forma es correcto según el estándar definido.</b>
 
 
 <b>#2 La suma total de longitudes de los segmentos es menor a 12 metros.</b>
 
 
 <b>#3 Ningún ángulo es mayor de 165o ni menor de -165o.</b>
