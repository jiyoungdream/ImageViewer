package kr.co.imageviewer;

import java.util.ArrayList;

public class Main {
	public static void main(String[] args) {
		
		ArrayList<String> files = new ArrayList<>();
		files.add("jquery-3.1.1.min.js");
		files.add("Stuk-jszip-v3.1.3-1-g5250332.zip");
//		ZipUtility.filesToZip("/Users/nari/Desktop", files);
//		System.out.println("zip end");
		
		ZipUtility.unzip("/Users/nari/Desktop", "images.zip");
		System.out.println("unzip end");
	}
}
