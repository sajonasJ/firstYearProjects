<?php 
 require_once "queryDb.php";
 $search = ("sproducts");
    if (isset($_GET["sproducts"])) {
        $search = $_GET["sproducts"];
    } else {
        $search = "queryDb.php";
    }
$prod = getProducts($search);
 ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>Hairmeup Salon Products</title>
    <meta charset="UTF-8">
    <!--external stylesheets-->
    <link href='./zmain.css' rel='stylesheet' type='text/css'>
    <link href='./zquery.css' rel='stylesheet' type='text/css'>
    <link href='./znav.css' rel='stylesheet' type='text/css'>
    <!--meta-->
    <meta name="description" content="HairMeUp Salon">
    <meta name="keywords" content="HTML, CSS">
    <meta name="author" content="Jonas Sajonas">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--favicon-->
    <link rel="apple-touch-icon" sizes="180x180" href="./favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="./favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="./favicon/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
</head>

<body>
    <div class='topsect'>
        <a href='index.html'><h1>HairmeUp Salon</h1> </a><img src="./favicon/android-chrome-512x512.png" alt="Logo" />
    </div>

    <!--------------------------------Image-------------------------------->

    <div class='middlepic'>
        <img src="pics/products.jpg" alt="Hair Products" />
    </div>

    <!--------------------------------Navigation---------------------------->
    <nav class="container red topBotomBordersOut">
        <a href='index.html'>HOME</a>
        <a href='women.html'>WOMEN</a>
        <a href='men.html'>MEN</a>
        <a href='products.php'>PRODUCTS</a>
        <a href='bookings.html'>BOOKINGS</a>
        <a href='info.html'>INFO</a>
    </nav>
    <div class='name-tag'>
        <h2> Products </h2>
        </div>
    <!--------------------------------CODE---------------------------->
    
    
    <div class='cut'>
        <div>
            <a href='bookings.html'><img src="pics/soap.jpg" alt="Soap" /></a>
            <p>Eco-Soap - $40
                <span class="booknow">
                    <a href='bookings.html'>Book Now</a>
                </span>
            </p>
        </div>
        <div>
            <a href='bookings.html'><img src="pics/shampoo.jpg" alt="Shampoo" /></a>
            <p>Eco-Shampoo - $50
                <span class="booknow">
                    <a href='bookings.html'>Book Now</a>
                </span>
            </p>
        </div>
        <div>
            <a href='bookings.html'><img src="pics/conditioner.jpg" alt="Conditioner" /></a>
            <p>Eco-Conditioner - $70
                <span class="booknow">
                    <a href='bookings.html'>Book Now</a>
                </span>
            </p>
        </div>
        <div>
            <a href='bookings.html'><img src="pics/hairdye.jpg" alt="Hairdye" /></a>
            <p>Eco-Hair Dye Product - $100
                <span class="booknow">
                    <a href='bookings.html'>Book Now</a>
                </span>
            </p>
        </div>
    </div>
    <form class="productsearch" method="get" action="products.php">
    <h4><label for="sproducts">Search for Products:</label></h4>
    <input type="text" name="sproducts" id="sproducts">
    <input type="submit" value="Search">
</form>

    <div class='sproducts'>
        <table class="tsearch">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Manufacturer</th>
                    <th>Description</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <?php
                foreach($prod as $prody) 
                {
                    echo "<tr>";
                    echo "<td>" . $prody['PRODUCTNAME'] . "</td>";        
                    echo "<td>" . $prody['MANUFACTURER'] . "</td>";
                    echo "<td>" . $prody['DESCRIPTION'] . "</td>";
                    echo "<td>" . $prody['PRICE'] . "</td>";
                    echo "</tr>"; 
                } 
                ?>
            </tbody>
        </table>
    </div>
    <!--------------------------------CODE---------------------------->
    <!--------------------------------CODE---------------------------->

    <footer class='endmsg'>
        <h3>Time Table</h3>

        <table class="tclass">
            <thead>
                <tr>
                    <th rowspan>Date</th>
                    <th colspan>Time</th>
                </tr>

            </thead>
            <tbody>
                <tr>
                    <td>Monday</td>
                    <td>9:00 am - 5:00 pm</td>
                </tr>
                <tr>
                    <td>Tuesday</td>
                    <td>9:00 am - 5:00 pm</td>
                </tr>
                <tr>
                    <td>Wednesday</td>
                    <td>9:00 am - 5:00 pm</td>
                </tr>
                <tr>
                    <td>Thursday</td>
                    <td>9:00 am - 5:00 pm</td>
                </tr>
                <tr>
                    <td>Friday</td>
                    <td>9:00 am - 5:00 pm</td>
                </tr>
                <tr>
                    <td>Saturday</td>
                    <td>8:00 am - 4:00 pm</td>
                </tr>
                <tr>
                    <td>Sunday</td>
                    <td>8:00 am - 4:00 pm</td>
                </tr>
                <tr>
                    <td>Public Holiday</td>
                    <td>10:00 am - 2:00 pm</td>
                </tr>
            </tbody>
        </table>

        <h3> Visit Us</h3>
        <p>
            Address: 1 GoldCoast, Southport, QLD 4215<br>
            Email: hairmeupsalon@salonempire.au<br>
            Phone Number: 0123 348978<br>
        </p>
        <h4>&copy; 2022 - HairMeUp Salon</h4>
    </footer>
</body>

</html>