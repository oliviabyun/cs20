<!DOCTYPE html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Jade Delight</title>
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

	form {
		margin: 0 auto;
		justify-content: center;
	}

	table {
		text-align: center;
	}

	input[type=radio] {
		text-align: center;
	}

	input[type="button"] {
		text-align: center;
		padding: 10px;
	}

    .userInfo, .col2 {
        display: block;
        width: 120px;
        margin-bottom: 10px;
    }

</style>
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
        //echo "Connected successfully<br>";

        //select the database
        $conn->select_db($db);
        
        //run a query
        $sql = "SELECT * FROM menu";
        $result = $conn->query($sql);

		$s = "";
		$i = 0;

        //get results
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
				$s = $s . "<tr>";
				$s = $s . td(makeSelect("quan" . $i, 0, 10),"selectQuantity");
				$s = $s . td($row["name"], "itemName");
				$s = $s . td("$" . $row["cost"], "cost");
				$s = $s . td("$<input type='text' name='cost'/>", "totalCost");
				$s = $s . "</tr>";
				$i = $i + 1;
            }
        }
		
		function makeSelect($name, $minRange, $maxRange)
		{
			$j = 0;
			$t = "";
			$t = "<select name='" . $name . "' size='1' onchange='updateCost()''>";
			for ($j = 0; $j <= 10; $j++) {
				$t = $t . "<option>" . $j . "</option>";
			}
				
			$t = $t . "</select>";
			return $t;
		}

		function td($content, $className="")
		{
			return "<td class = '" . $className . "'>" . $content . "</td>";
		}

        //close the connection
        $conn->close();
    ?>
<script>
	window.onload = function() {
		document.getElementById("timeInput").setAttribute("type", "hidden");
		pickup();
	}

	function pickup() {
		//see if order is a pickup order
		pickupOrder = document.getElementsByName("p_or_d")[0].checked;

		//get address input fields
		street = document.getElementsByName("street")[0];
		city = document.getElementsByName("city")[0];
        streetLabel = document.getElementsByName("street2")[0];
        cityLabel = document.getElementsByName("city2")[0];

		if (pickupOrder) {
			//hide address input fields for pickup orders
			street.style.visibility = "hidden";
			city.style.visibility = "hidden";
            streetLabel.style.visibility = "hidden";
            cityLabel.style.visibility = "hidden";
		} else {
			//show address input fields for delivery orders
			street.style.visibility = "visible";
			city.style.visibility = "visible";
            streetLabel.style.visibility = "visible";
            cityLabel.style.visibility = "visible";
		}
	}

	function updateCost() {
		menuItems = [4.50, 6.25, 6.25, 7.50, 2.85];
		items = 0;
		subtotal = 0;

		for (i = 0; i < menuItems.length; i++) {
			//get current input field
			items = document.getElementsByName("quan" + i)[0].value;

			if (items != 0) {
				//calculate price, round
				price = items * menuItems[i];
				price = price.toFixed(2);

				//update field to display price
				document.getElementsByName("cost")[i].value = price;
				subtotal += parseFloat(price);
			}
		}

		//calculate tax, total
		tax = 0.0625 * subtotal;
		total = tax + subtotal;

		//round to 2 decimal places
		subtotal = subtotal.toFixed(2);
		tax = tax.toFixed(2);
		total = total.toFixed(2);

		//update fields
		document.getElementById("subtotal").value = subtotal;
		document.getElementById("tax").value = tax;
		document.getElementById("total").value = total;
	}

	function getTime(min) {
		date = new Date();

		//calculate time
		date2 = new Date(date.getTime() + (60000 * min));

		return date2;
	}

	function sendTime(time, type) {
		//get hour and minutes to display in hour:minutes formate
		hour = time.getHours();
		minutes = time.getMinutes();

		//determine if AM or PM
		if (time.getHours() >= 12) {
			am = "PM";
		} else {
			am = "AM";
		}

		if (total == "") {
			total = 0;
		}

		//concatenate order data
		order = type + " time: " + hour + ":" + minutes.toString() + " " + am;
		
		//update time input
		document.getElementById("timeInput").value = order;
	}

	function validate() {
		//validate last name and phone number
		if (!validateLast() || !validatePhoneNumber() || !validateOrder()) {
			return false;
		}

		time = 0;

		//determine whether order is pickup or delivery
		pickupOrder = document.getElementsByName("p_or_d")[0].checked;
		type = "";

		if (pickupOrder) {
			time = 15;
			type = "Pickup";
		} else {
			//validate both address input fields
			if (!validateAddress("street") || !validateAddress("city")) {
				return false;
			}
			type = "Delivery";
		}

		//get estimated time and total
		eta = getTime(time);

		//send time to php page
		sendTime(eta, type);
		return true;
	}

	function validateLast() {
		//get last name input field
		lastName = document.getElementsByName('lname')[0];

		//check for empty input field
		if (lastName.value == "") {
			//print error message
			alert("Please enter your last name.")
			return false;
		}

		return true;
	}

	function validatePhoneNumber() {
		//get phone input field
		phoneNumber = document.getElementsByName('phone')[0];

		//check for empty input field
		if (phoneNumber.value == "") {
			//print error message
			alert("Please enter your phone number.");
			return false;
		}

		//turn phone number into a string
		phone = parseInt(phoneNumber.value);
		phone = phone.toString();

		//check to make sure phone is the right length
		if (phone.length == 7 || phone.length == 10) {
			return true;
		} else {
			//print error message
			alert("Invalid phone number - please try again.")
			return false;
		}
	}

	function validateOrder() {
		emptyOrder = 0;
		
		//loop through each menu item
		for (i = 0; i < menuItems.length; i++) {
			//get quantity of each item ordered
			items = parseInt(document.getElementsByName("quan" + i)[0].value);

			//if qty is 0, add to empty order variable
			if (items == 0) {
				emptyOrder++;
			}
		}

		//if # of empty qtys matches # of menu items, user didn't select any
		if (emptyOrder == menuItems.length) {
			//display error messsage
			alert("Please select at least one menu item.")
			return false;
		}
		
		return true;
	}

	function validateAddress(addressType) {
		//get address input given name of input
		input = document.getElementsByName(addressType)[0];

		//check to see if input is empty
		if (input.value == "") {
			//print error message
			alert("Please enter your " + addressType)
			return false;
		}

		return true;
	}
	
</script>
</head>

<body>
	
<script>

function td(content, className="")
{
	return "<td class = '" + className + "'>" + content + "</td>";
}
	
</script>
<div class="banner">
	<h1>Jade Delight</h1>
	<h3>Rated #1 in the Northeast!</h3>
</div>

<form method = "get" action="order.php" onsubmit = "return validate()">

<p class="userInfo"><label>First Name:</label> <input type="text" class="col2" name='fname' /></p>
<p class="userInfo"><label>Last Name*</label>:  <input type="text" class="col2" name='lname' /><span id="lastError"></span></p>
<p class="userInfo address"><label name="street2" id="delivery">Street*:</label> <input type="text" class="col2" name='street' /><span id="streetError"></span></p>
<p class="userInfo address"><label name="city2" id="delivery">City*:</label> <input type="text" class="col2" name='city' /><span id="phoneError"></span></p>
<p class="userInfo"><label>Phone*</label>: <input type="text" class="col2" name='phone' /></p>
<p> 
	<input type="radio"  name="p_or_d" value = "pickup" checked="checked" onclick = "pickup()"/>Pickup  
	<input type="radio"  name='p_or_d' value = 'delivery' onclick = "pickup()"/>
	Delivery
</p>
<table border="0" cellpadding="3">
  <tr>
    <th>Select Item</th>
    <th>Item Name</th>
    <th>Cost Each</th>
    <th>Total Cost</th>
  </tr>
<?php
	echo $s;
?>

</table>
<p class="subtotal totalSection"><label>Subtotal</label>: 
   $ <input type="text"  name='subtotal' id="subtotal" />
</p>
<p class="tax totalSection"><label>Mass tax 6.25%:</label>
  $ <input type="text"  name='tax' id="tax" />
</p>
<p class="total totalSection"><label>Total:</label> $ <input type="text"  name='total' id="total" />
</p>

<input type = "submit" value = "Submit Order"/>
<input type="text" id="timeInput" name="time" visiblity="hidden">
</form>
</body>
</html>