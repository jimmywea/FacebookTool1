import { filterPostsByDate, checkForViolations } from "./utils.js";

// Từ vi phạm và cách khắc phục
const violatingTerms = [
  { term: "vi phạm", fix: "Xóa nội dung này hoặc làm rõ thông tin." },
  { term: "bất hợp pháp", fix: "Tránh chia sẻ thông tin này." },
  { term: "sai lầm", fix: "Cập nhật nội dung để chính xác hơn." },
  { term: "cấm", fix: "Xem lại chính sách và gỡ bỏ nội dung." },
  { term: "trái luật", fix: "Liên hệ với chuyên gia để đảm bảo nội dung hợp pháp." }
];

// Bài viết giả lập
const dummyPosts = [
  { id: 1, content: "Thông tin bất động sản", date: "2024-10-01", link: "https://example.com/post1" },
  { id: 2, content: "Nội dung vi phạm chính sách", date: "2024-10-05", link: "https://example.com/post2" },
  { id: 3, content: "Cần tránh sai lầm", date: "2024-10-07", link: "https://example.com/post3" },
  { id: 4, content: "Bài viết hợp pháp", date: "2024-10-10", link: "https://example.com/post4" }
];

function startScan() {
  const facebookLink = document.getElementById("facebookLink").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const resultsDiv = document.getElementById("results");

  if (!facebookLink || !startDate || !endDate) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  // Lọc bài viết theo ngày
  const filteredPosts = filterPostsByDate(dummyPosts, startDate, endDate);
  resultsDiv.innerHTML = `<p>Tổng số bài viết trong khoảng thời gian: ${filteredPosts.length}</p>`;

  if (filteredPosts.length === 0) {
    resultsDiv.innerHTML += "<p>Không có bài viết nào trong khoảng thời gian đã chọn.</p>";
    return;
  }

  // Tạo bảng hiển thị kết quả
  let tableContent = `
    <table>
      <tr>
        <th>Bài viết</th>
        <th>Ngày</th>
        <th>Vi phạm</th>
        <th>Cách khắc phục</th>
        <th>Link</th>
      </tr>
  `;

  filteredPosts.forEach(post => {
    const violations = checkForViolations(post.content, violatingTerms.map(v => v.term));
    if (violations.length > 0) {
      violations.forEach(term => {
        const fix = violatingTerms.find(v => v.term === term).fix;
        tableContent += `
          <tr>
            <td>${post.content}</td>
            <td>${post.date}</td>
            <td>${term}</td>
            <td>${fix}</td>
            <td><a href="${post.link}" target="_blank">Xem bài viết</a></td>
          </tr>
        `;
      });
    }
  });

  tableContent += "</table>";
  resultsDiv.innerHTML += tableContent;
}

document.getElementById("scanBtn").addEventListener("click", startScan);
