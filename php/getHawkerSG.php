<?php
ini_set('auto_detect_line_endings',TRUE);
$filepath="..\data\Hawker_Centers.csv";

if($file=fopen($filepath,"r")) {
    while(! feof($file))
    {	$centers[]=fgetcsv($file, 1000, ",", "\"");  }
    fclose($file);
}

echo json_encode($centers);
