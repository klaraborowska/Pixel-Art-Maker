const table = $("#pixel_canvas");
const pickColor = $("#colorPicker");

////////// GRID //////////

// add rows to table function
function appendRow() {
  table.append("<tr></tr>");
}

// add cells to rows function
function appendCells() {
  $("tr").append("<td></td>");
}

// make grid function
function makeGrid() {
  const gridHeight = $("#input_height").val();
  const gridWidth = $("#input_width").val();

  for (let i = 0; i < gridHeight; i++) {
    appendRow();
  }
  for (let j = 0; j < gridWidth; j++) {
    appendCells();
  }
}

// create grid, when click on button (submit the form)
$("#sizePicker").submit(function(event) {
  // if table contains any elements (tr/td), remove the elements first and then create grid
  if (table.html().length > 0) {
    table.empty();
    makeGrid();
  } else {
    makeGrid();
  }

  // prevent submitting the form and refreshing the site
  event.preventDefault();
});

/* set the min input number of grid height and width to 1 and max to 50 (copied from stack overflow)
$("input[type=number]").on("mouseup keyup", function() {
  $(this).val(Math.min(50, Math.max(1, $(this).val())));
}); 
*/

// add 1 column, when click on button
$("#add_column").on("click", function() {
  // if table or tbody is empty, first add row
  if (table.html().length === 0 || $("tbody").html().length === 0) {
    appendRow();
    appendCells();
  } else {
    // if table is not empty clone last td elements and clear their background color
    $("td")
      .last()
      .clone()
      .appendTo("tr");
    $("td:last-child").css("background-color", "transparent");
  }
});

// delete 1 column, when click on button
$("#delete_column").on("click", function() {
  $("td:last-child").remove();

  // if all table cells are removed, remove rows
  if ($("tr").html().length === 0) {
    $("tr").remove();
  }
});

// add 1 row, when click on button
$("#add_row").on("click", function() {
  // if table or tbody is empty add row and add cells
  if (table.html().length === 0 || $("tbody").html().length === 0) {
    appendRow();
    appendCells();
  } else {
    // if table is not empty clone last row and clear their background color
    $("tr")
      .last()
      .clone()
      .appendTo(table);
    $("tr:last-child td").css("background-color", "transparent");
  }
});

// delete 1 row, when click on button
$("#delete_row").on("click", function() {
  $("tr:last-child").remove();
});

////////// CELL SIZE //////////

// set small cells
$("#small").on("click", function() {
  $("tr").css("height", "15px");
  $("td").css("width", "15px");
});

// set medium cells
$("#medium").on("click", function() {
  $("tr").css("height", "20px");
  $("td").css("width", "20px");
});

// set big cells
$("#big").on("click", function() {
  $("tr").css("height", "25px");
  $("td").css("width", "25px");
});

////////// COLOR //////////

// change color of element function
function changeColor(element, color) {
  $(element).css("background-color", color);
}

// change color, when click on table cell
// event is added to table not cells
table.on("click", function(event) {
  // event.target is the clicked element
  // if event.target is a td, change color to input color
  if (event.target && event.target.nodeName == "TD") {
    changeColor(event.target, pickColor.val());
  }
});

// clear the color on dblclick on table cell
// event is added to table not cells
table.on("dblclick", function(event) {
  // event.target is the clicked element
  // if event.target is a td, change color to white
  if (event.target && event.target.nodeName == "TD") {
    changeColor(event.target, "transparent");
  }
});

// clear the color on shift and mouseover the cells
table.on("mouseover", function(event) {
  // if shift key is pressed
  if (event.shiftKey) {
    // event.target is the clicked element
    // if event.target is a td, change color to white
    if (event.target && event.target.nodeName == "TD") {
      changeColor(event.target, "transparent");
    }
  }
});

// clear the table, when click on button
$("#clear").on("click", function() {
  changeColor("td", "transparent");
});

// change the color of the whole table when click on button
$("#bucket").on("click", function() {
  changeColor("td", pickColor.val());
});

//combine mousedown + mouseover to draw
let isDown = false;

$(document).mousedown(function() {
  // when mouse is down, isDown is true
  isDown = true;
});

$(document).mouseup(function() {
  // when mouse is up, isDown is false
  isDown = false;
});

// event is added to table not cells
table.on("mousedown mousemove", function(event) {
  // event.target is the clicked element
  // if event.target is a td, change color to input color
  if (event.target && event.target.nodeName == "TD") {
    //when mouse is down
    if (isDown) {
      changeColor(event.target, pickColor.val());
    }
  }
  event.preventDefault();
});

// add/remove white color to table background, when click on button
$("#table_color").on("click", function() {
  $("tr").toggleClass("bg-white");
});

////////// BORDER //////////

// remove/add grid, when click on button
$("#border").on("click", function() {
  $("tr").toggleClass("border-off");
  $("td").toggleClass("border-off");
});

////////// SIDE INSTRUCTIONS //////////

// hide/show instruction part, when click on menu logo
$("#nav_bar").on("click", function() {
  $("#hide_side").toggleClass("side-off");
  $("#table_zone").toggleClass("width");
});
