import { filterPostsByDate, checkForViolations } from "./utils.js";

// List of violating terms
const violatingTerms = ["vi phạm", "bất hợp pháp", "sai lầm", "cấm", "trái luật"];

// Simulated post data (this will be replaced with real data later)
const dummyPosts = [
  { id: 1, content: "Thông tin bất động sản", date: "2024-10-01", link: "#1" },
  { id: 2, content: "Nội dung vi phạm chính sách", date: "2024-10-05", link: "#2" },
  { id: 3, content: "Cần tránh sai lầm", date: "2024-10-07", link: "#3" },
  { id: 4, content: "Bài viết hợp pháp", date: "2024-10-10", link: "#4" }
];

// Function to start the scan
function startScan() {
  const facebookLink = document.getElementById("facebookLink").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const resultsDiv = document.getElementById("results");

  if (!facebookLink || !startDate || !endDate) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  // Filter posts within the selected date range
  const filteredPosts = filterPostsByDate(dummyPosts, startDate, endDate);
  resultsDiv.innerHTML = `<p>Tổng số bài viết trong khoảng thời gian: ${filteredPosts.length}</p>`;

  // Check each post for violations
  let foundViolations = false;
  filteredPosts.forEach(post => {
    const violations = checkForViolations(post.content, violatingTerms);
    if (violations.length > 0) {
      foundViolations = true;
      resultsDiv.innerHTML += `
        <div>
          <p><strong>Bài viết:</strong> ${post.content}</p>
          <p><strong>Ngày:</strong> ${post.date}</p>
          <p><strong>Vi phạm:</strong> ${violations.join(", ")}</p>
          <p><a href="${post.link}" target="_blank">Xem bài viết</a></p>
        </div>
      `;
    }
  });

  if (!foundViolations) {
    resultsDiv.innerHTML += "<p>Không có bài viết nào vi phạm trong khoảng thời gian đã chọn.</p>";
  }
}

// Attach event listener to scan button
document.getElementById("scanBtn").addEventListener("click", startScan);
