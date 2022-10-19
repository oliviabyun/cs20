<!doctype HTML>
<html>
<head>
    <meta charset="utf-8">
    <style>
        .banner {
            font-weight: bold;
            padding: 5px;
            border: 2px #000 solid;
            margin-bottom: 20px;
            margin-left: 20px;
            overflow: hidden;
            height: fit-content;
            width: fit-content;
            background-color: cornsilk;
            text-align: center;
        }

        body {
            background-color: aliceblue;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
        }

        table {
            text-align: center;
        }
    </style>
</head>
<body>
<div class="banner">
    <h1>Jade Delight</h1>
    <h3>Rated #1 in the Northeast!</h3>
</div>
    <?php
        //establish connection info
        $server = "localhost";// your server
        $userid = "uzfvrdrhbcyzw"; // your user id
        $pw = "cs20demopassword"; // your pw
        $db= "db1g4ten5jhi67"; // your database

        // Create connection
        $conn = new mysqli($server, $userid, $pw );

        // Check connection
        if ($conn->connect_error) {
        	die("Connection failed: " . $conn->connect_error);
        }

        //select the database
        $conn->select_db($db);
        
        //run a query
        $sql = "SELECT * FROM menu";
        $result = $conn->query($sql);

        //generate headers for receipt table
		$s = "<table border='0' cellpadding='3'>";
        $s = $s . "<tr>";
        $s = $s . "<th>Item Name</th>";
        $s = $s . "<th>Quantity</th>";
        $s = $s . "<th>Price</th>";

        $s = $s . "</tr>";
        $i = 0;

        //get results
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                //build results table with item, qty, and cost
                $item = $row["name"];
                $qty = $_GET["quan" . $i];
                $price = number_format(($row["cost"] * $qty), 2, ".", "");

                $s = $s . "<tr>";
                $s = $s . td($item, "itemName");
                $s = $s . td($qty, "quantity");
                $s = $s . td("$" . $price, "price");
                $s = $s . "</tr>";
                $i = $i + 1; 
            }
        }
        $s = $s . "</table><br/>";

        //close the connection
        $conn->close();

        //output thank you message
        echo "Thanks for ordering from Jade Delight!<br/><br/>";

        //receive, output time message
        $time = $_GET["time"];
        echo "$time <br/><br/>";

        //output receipt
        echo $s;

        //get subtotal, tax, and total
        $subtotal = $_GET["subtotal"];
        $tax = $_GET["tax"];
        $total = $_GET["total"];

        //build table to display subtotal, tax, and total
        $display = "<table border='0' cellpadding='3'>";
        $display = $display . "<tr>" . td("<strong>Subtotal</strong>", "subtotal") . td("$$subtotal", "subtotal2") . "</tr>";
        $display = $display . "<tr>" . td("<strong>Tax</strong>", "tax") . td("$$tax", "tax2") . "</tr>";
        $display = $display . "<tr>" . td("<strong>Total</strong>", "total") . td("$$total", "total2") . "</tr>";

        $display = $display . "</table><br/>";

        echo $display;

        //function that creates td tag
        function td($content, $className="")
		{
			return "<td class = '" . $className . "'>" . $content . "</td>";
		}

        //send email to user
        $to_email_address = "oliviabyun1@gmail.com";
        $subject = "Jade Delight Order";
        $message = "Thank you for the order!\n Your order total is $$total. $time";
        mail($to_email_address, $subject, $message);
    ?>
</body>
</html>