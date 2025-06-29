# EasyComment 路由重构和面包屑导航计划

## 当前路由结构分析
现有页面都在根目录下，需要根据导航栏分类重新组织：

### 当前页面位置：
- `/ai-carousel-generator`
- `/fake-tweet-generator`
- `/tiktok-hashtag-generator`
- `/instagram-giveaway-picker`
- `/tiktok-comment-picker`
- 等等...

## 新的路由结构设计

### 1. Free Tools `/free-tools/`
**AI生成器类别：**
- `/free-tools/ai-carousel-generator`
- `/free-tools/fake-tweet-generator`
- `/free-tools/fake-instagram-post-generator`
- `/free-tools/fake-youtube-comment-generator`
- `/free-tools/discord-bio-generator`
- `/free-tools/facebook-post-generator`

**标签生成器类别：**
- `/free-tools/tiktok-hashtag-generator`
- `/free-tools/linkedin-hashtag-generator`
- `/free-tools/youtube-hashtag-generator`
- `/free-tools/instagram-caption-generator`
- `/free-tools/tiktok-name-generator`

**下载工具类别：**
- `/free-tools/reddit-video-downloader`
- `/free-tools/tiktok-video-downloader`
- `/free-tools/linkedin-video-downloader`
- `/free-tools/audio-to-video-converter`

### 2. Giveaway `/giveaway/`
- `/giveaway/instagram-giveaway-picker`
- `/giveaway/facebook-comment-picker`
- `/giveaway/tiktok-comment-picker`
- `/giveaway/twitter-picker`
- `/giveaway/youtube-comment-picker`

### 3. Export Comment `/export-comment/`
- `/export-comment/instagram-comments-export`
- `/export-comment/facebook-comments-export`
- `/export-comment/youtube-comment-exporter`

### 4. Export Follow `/export-follow/`
- `/export-follow/ig-follower-export`
- `/export-follow/tiktok-following-export`
- `/export-follow/facebook-friends-export`
- `/export-follow/twitter-following-export`

## 面包屑导航设计
```
Home > Free Tools > AI生成器 > AI Carousel Generator
Home > Giveaway > Instagram Giveaway Picker
Home > Export Comment > Instagram Comments Export
```

## 实施计划：
- [ ] 创建新的文件夹结构
- [ ] 移动现有页面到对应分类目录
- [ ] 创建面包屑导航组件
- [ ] 更新Navigation.tsx中的链接
- [ ] 更新所有内部链接引用
- [ ] 测试所有路由是否正常工作
