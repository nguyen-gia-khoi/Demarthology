import { Question, Comment } from "../models/Question";

// Dummy comments data
export const mockComments: Comment[] = [
  {
    _id: "comment1",
    questionId: "q1",
    content: "Bạn nên đi khám bác sĩ da liễu ngay. Triệu chứng này có thể là dấu hiệu của viêm da cơ địa. Tránh gãi và sử dụng kem dưỡng ẩm không mùi.",
    author: {
      _id: "user3",
      name: "BS. Nguyễn Thị Lan",
      avatar: "/avatar.webp"
    },
    createdAt: "2024-01-20T10:30:00Z",
    updatedAt: "2024-01-20T10:30:00Z",
    likes: 15,
    dislikes: 1,
    isAnswer: true,
    replies: [
      {
        _id: "reply1",
        questionId: "q1",
        content: "Cảm ơn bác sĩ! Tôi sẽ đặt lịch khám ngay.",
        author: {
          _id: "user1",
          name: "Nguyễn Văn A",
          avatar: "/avatar.webp"
        },
        createdAt: "2024-01-20T11:00:00Z",
        updatedAt: "2024-01-20T11:00:00Z",
        likes: 3,
        dislikes: 0,
        isAnswer: false,
        parentId: "comment1"
      }
    ]
  },
  {
    _id: "comment2",
    questionId: "q2",
    content: "Mụn trứng cá ở tuổi này khá phổ biến. Bạn nên rửa mặt 2 lần/ngày bằng sữa rửa mặt dành cho da dầu, sử dụng kem chống nắng và tránh nặn mụn.",
    author: {
      _id: "user4",
      name: "Pharmacist Minh",
      avatar: "/avatar.webp"
    },
    createdAt: "2024-01-19T15:20:00Z",
    updatedAt: "2024-01-19T15:20:00Z",
    likes: 8,
    dislikes: 0,
    isAnswer: true
  },
  {
    _id: "comment3",
    questionId: "q3",
    content: "Đây có thể là nấm da. Bạn cần giữ vùng da khô ráo và sử dụng thuốc chống nấm theo đơn của bác sĩ. Tránh mặc quần áo quá chật.",
    author: {
      _id: "user5",
      name: "Dr. Hoàng Minh",
      avatar: "/avatar.webp"
    },
    createdAt: "2024-01-18T09:45:00Z",
    updatedAt: "2024-01-18T09:45:00Z",
    likes: 12,
    dislikes: 2,
    isAnswer: true
  }
];

// Dummy questions data
export const mockQuestions: Question[] = [
  {
    _id: "q1",
    title: "Da tôi bị ngứa và xuất hiện nhiều đốm đỏ, không biết có phải bệnh gì không?",
    content: "Chào mọi người, gần đây da tôi bị ngứa rất nhiều, đặc biệt là vào ban đêm. Trên da xuất hiện những đốm đỏ nhỏ, có vảy trắng. Tôi đã thử dùng kem dưỡng ẩm nhưng không khá hơn. Các bạn có biết đây là bệnh gì không và cách điều trị như thế nào? Cảm ơn mọi người!",
    author: {
      _id: "user1",
      name: "Nguyễn Văn A",
      avatar: "/avatar.webp"
    },
    tags: ["viêm da", "ngứa", "đốm đỏ", "da khô"],
    createdAt: "2024-01-20T08:30:00Z",
    updatedAt: "2024-01-20T10:30:00Z",
    commentCount: 5,
    isResolved: true,
    likes: 23,
    dislikes: 2,
    views: 156
  },
  {
    _id: "q2",
    title: "Mụn trứng cá ở tuổi 25 có bình thường không?",
    content: "Tôi năm nay 25 tuổi, nghĩ rằng đã qua tuổi nổi mụn nhưng gần đây mặt tôi lại nổi mụn rất nhiều. Mụn chủ yếu tập trung ở vùng cằm và má. Tôi có thay đổi kem dưỡng da nhưng tình trạng không khá hơn. Mọi người có gặp tình trạng tương tự không? Có cách nào điều trị hiệu quả không ạ?",
    author: {
      _id: "user2",
      name: "Trần Thị B",
      avatar: "/avatar.webp"
    },
    tags: ["mụn trứng cá", "tuổi trưởng thành", "điều trị mụn"],
    createdAt: "2024-01-19T14:15:00Z",
    updatedAt: "2024-01-19T15:20:00Z",
    commentCount: 3,
    isResolved: true,
    likes: 18,
    dislikes: 1,
    views: 243
  },
  {
    _id: "q3",
    title: "Vùng da háng bị đỏ và ngứa, có mùi khó chịu",
    content: "Vùng da háng của tôi bị đỏ, ngứa và có mùi hơi khó chịu. Tình trạng này kéo dài đã 2 tuần rồi. Tôi có vệ sinh cá nhân sạch sẽ nhưng không thấy khá hơn. Không biết có phải do thời tiết nóng ẩm hay do bệnh gì khác? Mọi người có thể tư vấn giúp tôi không?",
    author: {
      _id: "user6",
      name: "Lê Văn C",
      avatar: "/avatar.webp"
    },
    tags: ["nấm da", "viêm da", "vùng kín", "ngứa"],
    createdAt: "2024-01-18T09:00:00Z",
    updatedAt: "2024-01-18T09:45:00Z",
    commentCount: 4,
    isResolved: true,
    likes: 8,
    dislikes: 0,
    views: 89
  },
  {
    _id: "q4",
    title: "Da mặt bị khô và bong tróc sau khi dùng kem trị mụn",
    content: "Tôi vừa bắt đầu dùng kem trị mụn có chứa Tretinoin theo đơn bác sĩ. Nhưng sau 1 tuần sử dụng, da mặt tôi bị khô và bong tróc rất nhiều. Có phải đây là tác dụng phụ bình thường không? Tôi có nên ngừng sử dụng hay tiếp tục? Mong mọi người chia sẻ kinh nghiệm.",
    author: {
      _id: "user7",
      name: "Phạm Thị D",
      avatar: "/avatar.webp"
    },
    tags: ["tretinoin", "tác dụng phụ", "da khô", "bong tróc"],
    createdAt: "2024-01-17T16:20:00Z",
    updatedAt: "2024-01-17T16:20:00Z",
    commentCount: 2,
    isResolved: false,
    likes: 12,
    dislikes: 1,
    views: 167
  },
  {
    _id: "q5",
    title: "Làm thế nào để điều trị sẹo mụn hiệu quả?",
    content: "Sau thời gian dài điều trị mụn, da tôi đã sạch mụn nhưng để lại rất nhiều sẹo lõm. Tôi đã thử nhiều loại kem nhưng sẹo vẫn không phai. Có ai đã từng điều trị sẹo mụn thành công không? Các phương pháp như laser, chemical peel có hiệu quả không? Chi phí khoảng bao nhiêu?",
    author: {
      _id: "user8",
      name: "Hoàng Văn E",
      avatar: "/avatar.webp"
    },
    tags: ["sẹo mụn", "điều trị sẹo", "laser", "chemical peel"],
    createdAt: "2024-01-16T11:30:00Z",
    updatedAt: "2024-01-16T11:30:00Z",
    commentCount: 0,
    isResolved: false,
    likes: 25,
    dislikes: 0,
    views: 312
  },
  {
    _id: "q6",
    title: "Da bị dị ứng với kem chống nắng, có thay thế nào khác không?",
    content: "Mỗi lần tôi thoa kem chống nắng là da bị đỏ, ngứa và nổi mẩn đỏ. Tôi đã thử nhiều loại kem chống nắng khác nhau nhưng đều bị dị ứng. Có loại kem chống nắng nào dành cho da nhạy cảm không? Hoặc có cách bảo vệ da khỏi nắng mà không cần dùng kem chống nắng?",
    author: {
      _id: "user9",
      name: "Ngô Thị F",
      avatar: "/avatar.webp"
    },
    tags: ["dị ứng", "kem chống nắng", "da nhạy cảm", "bảo vệ da"],
    createdAt: "2024-01-15T13:45:00Z",
    updatedAt: "2024-01-15T13:45:00Z",
    commentCount: 1,
    isResolved: false,
    likes: 19,
    dislikes: 2,
    views: 198
  },
  {
    _id: "q7",
    title: "Chân bị nứt nẻ và khô ráp, đặc biệt ở gót chân",
    content: "Gót chân tôi bị nứt nẻ rất sâu, có khi chảy máu. Tôi đã thử dùng kem dưỡng ẩm và đá bọt nhưng không hiệu quả. Tình trạng này ảnh hưởng đến việc đi lại và rất đau. Có cách nào điều trị triệt để không? Có cần phải đi khám bác sĩ không?",
    author: {
      _id: "user10",
      name: "Đỗ Văn G",
      avatar: "/avatar.webp"
    },
    tags: ["chân nứt nẻ", "gót chân", "da khô", "chăm sóc chân"],
    createdAt: "2024-01-14T10:15:00Z",
    updatedAt: "2024-01-14T10:15:00Z",
    commentCount: 0,
    isResolved: false,
    likes: 7,
    dislikes: 0,
    views: 134
  },
  {
    _id: "q8",
    title: "Tóc rụng nhiều và có gàu, có liên quan đến stress không?",
    content: "Gần đây tôi bị stress công việc và nhận thấy tóc rụng rất nhiều. Da đầu cũng bị ngứa và có gàu trắng. Tôi đã đổi dầu gội nhưng tình trạng không cải thiện. Có phải stress có thể gây rụng tóc và gàu không? Có cách nào điều trị đồng thời cả hai vấn đề này?",
    author: {
      _id: "user11",
      name: "Bùi Thị H",
      avatar: "/avatar.webp"
    },
    tags: ["rụng tóc", "gàu", "stress", "da đầu"],
    createdAt: "2024-01-13T15:30:00Z",
    updatedAt: "2024-01-13T15:30:00Z",
    commentCount: 0,
    isResolved: false,
    likes: 14,
    dislikes: 1,
    views: 221
  },
  {
    _id: "q9",
    title: "Móng tay bị vàng và dày lên, có phải bệnh nấm không?",
    content: "Móng tay và móng chân của tôi bị vàng, dày lên và dễ gãy. Tôi nghi ngờ có thể bị nấm móng. Triệu chứng này đã kéo dài khoảng 3 tháng. Điều trị nấm móng có khó khăn không? Cần bao lâu để khỏi hoàn toàn? Có thuốc nào hiệu quả không?",
    author: {
      _id: "user12",
      name: "Vũ Văn I",
      avatar: "/avatar.webp"
    },
    tags: ["nấm móng", "móng vàng", "điều trị nấm", "thuốc chống nấm"],
    createdAt: "2024-01-12T09:20:00Z",
    updatedAt: "2024-01-12T09:20:00Z",
    commentCount: 0,
    isResolved: false,
    likes: 11,
    dislikes: 0,
    views: 176
  },
  {
    _id: "q10",
    title: "Da có nhiều nốt ruồi mới xuất hiện, có nguy hiểm không?",
    content: "Tuần trước tôi phát hiện trên người mình xuất hiện thêm vài nốt ruồi mới. Một số nốt có màu đen đậm, kích thước khoảng 3-4mm. Tôi có nên lo lắng không? Làm thế nào để biết nốt ruồi có nguy hiểm? Khi nào cần đi khám bác sĩ da liễu?",
    author: {
      _id: "user13",
      name: "Lý Thị K",
      avatar: "/avatar.webp"
    },
    tags: ["nốt ruồi", "ung thư da", "khám da liễu", "sức khỏe da"],
    createdAt: "2024-01-11T14:00:00Z",
    updatedAt: "2024-01-11T14:00:00Z",
    commentCount: 0,
    isResolved: false,
    likes: 32,
    dislikes: 1,
    views: 405
  },
  {
    _id: "q11",
    title: "Da bị nám sau khi sinh con, có cách nào điều trị không?",
    content: "Sau khi sinh con được 6 tháng, da mặt tôi xuất hiện nhiều đốm nám màu nâu đậm ở hai bên má. Tôi đã thử dùng kem trị nám nhưng không hiệu quả. Có ai đã từng gặp tình trạng tương tự không? Có phương pháp điều trị nào an toàn cho phụ nữ đang cho con bú không?",
    author: {
      _id: "user14",
      name: "Trần Thị L",
      avatar: "/avatar.webp"
    },
    tags: ["nám da", "sau sinh", "điều trị nám", "phụ nữ mang thai"],
    createdAt: "2024-01-10T12:30:00Z",
    updatedAt: "2024-01-10T12:30:00Z",
    commentCount: 2,
    isResolved: false,
    likes: 28,
    dislikes: 0,
    views: 289
  },
  {
    _id: "q12",
    title: "Da bị cháy nắng nghiêm trọng, làm thế nào để phục hồi?",
    content: "Hôm qua tôi đi biển và bị cháy nắng rất nặng. Da đỏ ửng, đau rát và có cảm giác nóng. Tôi đã thử dùng kem dưỡng ẩm và uống nhiều nước nhưng vẫn rất khó chịu. Có cách nào giảm đau và phục hồi da nhanh không? Khi nào cần đi khám bác sĩ?",
    author: {
      _id: "user15",
      name: "Nguyễn Văn M",
      avatar: "/avatar.webp"
    },
    tags: ["cháy nắng", "phục hồi da", "điều trị cháy nắng", "bảo vệ da"],
    createdAt: "2024-01-09T16:45:00Z",
    updatedAt: "2024-01-09T16:45:00Z",
    commentCount: 3,
    isResolved: true,
    likes: 15,
    dislikes: 1,
    views: 234
  },
  {
    _id: "q13",
    title: "Da bị mụn ẩn dưới da, không nổi lên nhưng sờ thấy cục cứng",
    content: "Da mặt tôi có nhiều mụn ẩn dưới da, không nổi lên nhưng khi sờ vào thấy có cục cứng. Tôi đã thử nặn nhưng không ra gì cả. Loại mụn này có nguy hiểm không? Có cách nào điều trị hiệu quả không? Có cần phải đi khám bác sĩ da liễu không?",
    author: {
      _id: "user16",
      name: "Lê Thị N",
      avatar: "/avatar.webp"
    },
    tags: ["mụn ẩn", "mụn dưới da", "điều trị mụn", "da liễu"],
    createdAt: "2024-01-08T10:20:00Z",
    updatedAt: "2024-01-08T10:20:00Z",
    commentCount: 1,
    isResolved: false,
    likes: 22,
    dislikes: 2,
    views: 187
  },
  {
    _id: "q14",
    title: "Da bị dị ứng với mỹ phẩm, làm thế nào để test trước khi dùng?",
    content: "Tôi thường bị dị ứng với các loại mỹ phẩm mới. Da bị đỏ, ngứa và nổi mẩn. Có cách nào test mỹ phẩm trước khi sử dụng toàn bộ mặt không? Tôi nên test ở đâu và trong bao lâu? Có loại mỹ phẩm nào dành cho da nhạy cảm không?",
    author: {
      _id: "user17",
      name: "Phạm Văn O",
      avatar: "/avatar.webp"
    },
    tags: ["dị ứng mỹ phẩm", "test mỹ phẩm", "da nhạy cảm", "mỹ phẩm an toàn"],
    createdAt: "2024-01-07T14:15:00Z",
    updatedAt: "2024-01-07T14:15:00Z",
    commentCount: 0,
    isResolved: false,
    likes: 18,
    dislikes: 0,
    views: 156
  },
  {
    _id: "q15",
    title: "Da bị lão hóa sớm, có dấu hiệu nếp nhăn ở tuổi 30",
    content: "Tôi năm nay 30 tuổi nhưng đã thấy xuất hiện nếp nhăn ở khóe mắt và trán. Da cũng bị khô và thiếu sức sống. Có cách nào làm chậm quá trình lão hóa không? Các sản phẩm chống lão hóa nào hiệu quả? Có cần phải dùng botox hay các phương pháp thẩm mỹ khác không?",
    author: {
      _id: "user18",
      name: "Hoàng Thị P",
      avatar: "/avatar.webp"
    },
    tags: ["lão hóa da", "nếp nhăn", "chống lão hóa", "thẩm mỹ"],
    createdAt: "2024-01-06T11:30:00Z",
    updatedAt: "2024-01-06T11:30:00Z",
    commentCount: 2,
    isResolved: false,
    likes: 35,
    dislikes: 1,
    views: 423
  },
  {
    _id: "q16",
    title: "Da bị mụn cóc ở tay, có lây lan không?",
    content: "Tôi phát hiện có mụn cóc nhỏ ở ngón tay. Mụn có màu trắng, sần sùi và hơi đau khi ấn vào. Loại mụn này có lây lan sang các vùng khác không? Có cách nào điều trị tại nhà không? Khi nào cần đi khám bác sĩ?",
    author: {
      _id: "user19",
      name: "Đỗ Văn Q",
      avatar: "/avatar.webp"
    },
    tags: ["mụn cóc", "virus HPV", "điều trị mụn cóc", "lây lan"],
    createdAt: "2024-01-05T09:45:00Z",
    updatedAt: "2024-01-05T09:45:00Z",
    commentCount: 1,
    isResolved: false,
    likes: 12,
    dislikes: 0,
    views: 134
  },
  {
    _id: "q17",
    title: "Da bị bạch biến, có cách nào điều trị không?",
    content: "Tôi phát hiện trên da có những đốm trắng loang lổ, đặc biệt ở mặt và tay. Bác sĩ chẩn đoán là bệnh bạch biến. Bệnh này có chữa được không? Có phương pháp điều trị nào hiệu quả không? Bệnh có ảnh hưởng đến sức khỏe tổng thể không?",
    author: {
      _id: "user20",
      name: "Bùi Văn R",
      avatar: "/avatar.webp"
    },
    tags: ["bạch biến", "đốm trắng", "bệnh tự miễn", "điều trị"],
    createdAt: "2024-01-04T13:20:00Z",
    updatedAt: "2024-01-04T13:20:00Z",
    commentCount: 0,
    isResolved: false,
    likes: 8,
    dislikes: 0,
    views: 98
  },
  {
    _id: "q18",
    title: "Da bị chàm eczema, làm thế nào để kiểm soát?",
    content: "Tôi bị chàm eczema từ nhỏ, da thường xuyên bị khô, ngứa và bong tróc. Bệnh có xu hướng nặng hơn vào mùa đông. Có cách nào kiểm soát bệnh hiệu quả không? Có loại kem dưỡng ẩm nào phù hợp không? Có cần thay đổi chế độ ăn uống không?",
    author: {
      _id: "user21",
      name: "Vũ Thị S",
      avatar: "/avatar.webp"
    },
    tags: ["chàm eczema", "viêm da", "dưỡng ẩm", "chế độ ăn"],
    createdAt: "2024-01-03T15:10:00Z",
    updatedAt: "2024-01-03T15:10:00Z",
    commentCount: 3,
    isResolved: true,
    likes: 26,
    dislikes: 1,
    views: 312
  },
  {
    _id: "q19",
    title: "Da bị mụn đầu đen, có cách nào loại bỏ hiệu quả?",
    content: "Mũi tôi có rất nhiều mụn đầu đen, đặc biệt là ở cánh mũi. Tôi đã thử dùng các loại mặt nạ và kem tẩy tế bào chết nhưng không hiệu quả. Có cách nào loại bỏ mụn đầu đen triệt để không? Có sản phẩm nào đặc trị không?",
    author: {
      _id: "user22",
      name: "Lý Văn T",
      avatar: "/avatar.webp"
    },
    tags: ["mụn đầu đen", "tẩy tế bào chết", "chăm sóc da", "mặt nạ"],
    createdAt: "2024-01-02T12:30:00Z",
    updatedAt: "2024-01-02T12:30:00Z",
    commentCount: 1,
    isResolved: false,
    likes: 19,
    dislikes: 0,
    views: 245
  },
  {
    _id: "q20",
    title: "Da bị sẹo lồi sau phẫu thuật, có cách nào điều trị không?",
    content: "Tôi có vết sẹo lồi ở bụng sau khi mổ ruột thừa 2 năm trước. Sẹo có màu đỏ, nổi cao và đôi khi bị ngứa. Có cách nào làm phẳng sẹo và giảm màu đỏ không? Các phương pháp như laser có hiệu quả không? Chi phí điều trị khoảng bao nhiêu?",
    author: {
      _id: "user23",
      name: "Ngô Văn U",
      avatar: "/avatar.webp"
    },
    tags: ["sẹo lồi", "điều trị sẹo", "laser", "phẫu thuật"],
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-01T10:00:00Z",
    commentCount: 0,
    isResolved: false,
    likes: 14,
    dislikes: 0,
    views: 178
  }
];
export const symptomOptions: string[] = [
  "viêm da", "ngứa", "đốm đỏ", "da khô", "mụn trứng cá", 
  "tuổi trưởng thành", "điều trị mụn", "nấm da", "vùng kín",
  "tretinoin", "tác dụng phụ", "bong tróc", "sẹo mụn", 
  "điều trị sẹo", "laser", "chemical peel", "dị ứng", 
  "kem chống nắng", "da nhạy cảm", "bảo vệ da", "chân nứt nẻ",
  "gót chân", "chăm sóc chân", "rụng tóc", "gàu", "stress",
  "da đầu", "nấm móng", "móng vàng", "điều trị nấm", 
  "thuốc chống nấm", "nốt ruồi", "ung thư da", "khám da liễu",
  "sức khỏe da", "nám da", "sau sinh", "điều trị nám", 
  "phụ nữ mang thai", "cháy nắng", "phục hồi da", 
  "điều trị cháy nắng", "mụn ẩn", "mụn dưới da", "da liễu",
  "dị ứng mỹ phẩm", "test mỹ phẩm", "mỹ phẩm an toàn",
  "lão hóa da", "nếp nhăn", "chống lão hóa", "thẩm mỹ",
  "mụn cóc", "virus HPV", "điều trị mụn cóc", "lây lan",
  "bạch biến", "đốm trắng", "bệnh tự miễn", "chàm eczema",
  "dưỡng ẩm", "chế độ ăn", "mụn đầu đen", "tẩy tế bào chết",
  "chăm sóc da", "mặt nạ", "sẹo lồi", "phẫu thuật"
];

// Helper functions
export const getQuestionById = (id: string): Question | undefined => {
  return mockQuestions.find(q => q._id === id);
};

export const getCommentsByQuestionId = (questionId: string): Comment[] => {
  return mockComments.filter(c => c.questionId === questionId);
};

export const getQuestionsWithPagination = (page: number = 1, limit: number = 10): Question[] => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return mockQuestions.slice(startIndex, endIndex);
};

export const getTotalQuestionsCount = (): number => {
  return mockQuestions.length;
};

export const hasMoreQuestions = (page: number, limit: number): boolean => {
  return page * limit < mockQuestions.length;
};
