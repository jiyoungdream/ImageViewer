package kr.co.imageviewer;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

public class ZipUtility {
	
	private final static int FILE_BUFFER = 1024;
	
	public static void filesToZip(String filePath, List<String> files) {
		// 압축할 파일에 포함시킬 파일들
		// String[] files = new String[] { "D:\\zipfile\\a.txt",
		// "D:\\zipfile\\b.txt" };

		// 파일을 읽기위한 버퍼
		byte[] buf = new byte[FILE_BUFFER];

		try {
			// 압축파일명
			String zipName = "/Users/nari/Desktop/images.zip";
			ZipOutputStream out = new ZipOutputStream(new FileOutputStream(zipName));

			// 파일 압축
			for (int i = 0; i < files.size(); i++) {

				String file = filePath + "/" + files.get(i);
				FileInputStream in = new FileInputStream(file);

				// 압축 항목추가 (경로까지 넣으면 압축파일안에 폴더경로가 생긴다.
				out.putNextEntry(new ZipEntry(files.get(i)));

				// 바이트 전송
				int len;
				while ((len = in.read(buf)) > 0) {
					out.write(buf, 0, len);
				}

				out.closeEntry();
				in.close();
			}

			// 압축파일 작성
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static void unzip(String unzipPath, String zipFile) {
		try {
			// 압축파일 열기
//			String zipfile = "D:\\zipfile\\ab.zip";
			String file = unzipPath + "/" + zipFile;
			File fileCheck = new File(file);
			if (!fileCheck.exists()) {
				System.out.println("file is not exist");
				return;
			}
			
			String zipFileName = zipFile.substring(0, zipFile.lastIndexOf("."));
			// 압축 해제 폴더 확인
			File unzipFolder = new File(unzipPath + "/" + zipFileName);
			if (!unzipFolder.exists()) {
				unzipFolder.mkdirs();
			}
			
			ZipInputStream in = new ZipInputStream(new FileInputStream(file));
			// 엔트리 취득
			ZipEntry entry = null;
			while ((entry = in.getNextEntry()) != null) {
//				System.out.println(unzipPath + "/" + entry.getName() + "에 압축을 풉니다.");
				OutputStream out = new FileOutputStream(unzipPath + "/" + zipFileName + "/" + entry.getName());
				// 버퍼
				byte[] buf = new byte[FILE_BUFFER];
				int len;
				while ((len = in.read(buf)) > 0) {
					out.write(buf, 0, len);
				}

				in.closeEntry();
				// out닫기
				out.close();
			}
			in.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
