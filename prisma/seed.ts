import { prisma } from "@/prisma"

async function main() {
  console.log('🌱 Starting seed...')

  // Delete existing data in correct order (respecting foreign key constraints)
  console.log('🗑️  Cleaning existing data...')
  await prisma.like.deleteMany()
  await prisma.bookmark.deleteMany()
  await prisma.follow.deleteMany()
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()

  // Create users
  console.log('👥 Creating users...')
  const john = await prisma.user.create({
    data: {
      email: 'john@example.com',
      username: 'johndoe',
      displayName: 'John Doe',
      bio: 'Software Engineer | Tech Enthusiast | Coffee Lover ☕',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe',
      coverImage: 'https://picsum.photos/1500/500?random=1',
      location: 'San Francisco, CA',
      website: 'https://johndoe.dev',
      job: 'Senior Software Engineer at TechCorp',
      birthDate: new Date('1990-05-15'),
      verified: true,
    },
  })

  const alice = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      username: 'alicewonder',
      displayName: 'Alice Wonder',
      bio: 'Designer | Creative Mind | Exploring the world 🌍',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alicewonder',
      coverImage: 'https://picsum.photos/1500/500?random=2',
      location: 'New York, NY',
      website: 'https://alicewonder.design',
      job: 'UI/UX Designer',
      birthDate: new Date('1995-08-22'),
      verified: true,
    },
  })

  const bob = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      username: 'bobbuilder',
      displayName: 'Bob Builder',
      bio: 'Building awesome things | Full-stack developer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bobbuilder',
      location: 'Austin, TX',
      website: 'https://bobbuilds.io',
      job: 'Full-Stack Developer',
      birthDate: new Date('1992-03-10'),
      verified: false,
    },
  })

  const sarah = await prisma.user.create({
    data: {
      email: 'sarah@example.com',
      username: 'sarahcodes',
      displayName: 'Sarah Chen',
      bio: 'Frontend developer | React enthusiast | Open source contributor 💻',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarahcodes',
      coverImage: 'https://picsum.photos/1500/500?random=3',
      location: 'Seattle, WA',
      website: 'https://sarahchen.dev',
      job: 'Frontend Engineer at StartupXYZ',
      birthDate: new Date('1993-11-30'),
      verified: true,
    },
  })

  const mike = await prisma.user.create({
    data: {
      email: 'mike@example.com',
      username: 'miketech',
      displayName: 'Mike Johnson',
      bio: 'Tech blogger | AI/ML enthusiast | Lifelong learner 🤖',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=miketech',
      coverImage: 'https://picsum.photos/1500/500?random=4',
      location: 'Boston, MA',
      website: 'https://miketech.blog',
      job: 'ML Engineer',
      birthDate: new Date('1988-07-18'),
      verified: false,
    },
  })

  console.log('✅ Created 5 users')

  // Create posts
  console.log('📝 Creating posts...')
  const post1 = await prisma.post.create({
    data: {
      desc: 'Just launched my new portfolio website! 🚀 Check it out and let me know what you think!',
      img: 'https://picsum.photos/800/600?random=10',
      userId: john.id,
    },
  })

  const post2 = await prisma.post.create({
    data: {
      desc: 'Hello world! 👋 Excited to join this amazing community!',
      img: 'https://picsum.photos/800/600?random=11',
      userId: alice.id,
    },
  })

  const post3 = await prisma.post.create({
    data: {
      desc: 'Learning Next.js and loving it! The App Router is a game changer. #WebDev #NextJS',
      userId: bob.id,
    },
  })

  const post4 = await prisma.post.create({
    data: {
      desc: 'Beautiful sunset today 🌅',
      img: 'https://picsum.photos/800/600?random=12',
      userId: alice.id,
    },
  })

  const post5 = await prisma.post.create({
    data: {
      desc: 'Working on a new AI project. Can\'t wait to share the results! 🤖✨',
      userId: mike.id,
    },
  })

  const post6 = await prisma.post.create({
    data: {
      desc: 'Coffee and code - the perfect combo ☕💻',
      img: 'https://picsum.photos/800/600?random=13',
      userId: sarah.id,
    },
  })

  const post7 = await prisma.post.create({
    data: {
      desc: 'Just finished reading "Clean Code". Highly recommended for all developers! 📚',
      userId: john.id,
    },
  })

  const post8 = await prisma.post.create({
    data: {
      desc: 'Design tip: Always keep your user in mind. Simplicity is key! 🎨',
      userId: alice.id,
    },
  })

  const post9 = await prisma.post.create({
    data: {
      desc: 'Check out this amazing tutorial on React hooks!',
      video: 'https://example.com/video.mp4',
      userId: sarah.id,
    },
  })

  const post10 = await prisma.post.create({
    data: {
      desc: 'Building in public: Day 1 of my 100 days of code challenge! 💪',
      userId: bob.id,
    },
  })

  // Create some reply posts (comments)
  console.log('💬 Creating comments/replies...')
  const reply1 = await prisma.post.create({
    data: {
      desc: 'Looks amazing! Great work! 🔥',
      userId: alice.id,
      parentPostId: post1.id,
    },
  })

  const reply2 = await prisma.post.create({
    data: {
      desc: 'Welcome to the community! 🎉',
      userId: john.id,
      parentPostId: post2.id,
    },
  })

  const reply3 = await prisma.post.create({
    data: {
      desc: 'I agree! The App Router is incredible. Have you tried Server Actions yet?',
      userId: sarah.id,
      parentPostId: post3.id,
    },
  })

  const reply4 = await prisma.post.create({
    data: {
      desc: 'Absolutely! Clean Code changed my perspective on programming.',
      userId: mike.id,
      parentPostId: post7.id,
    },
  })

  // Create some reposts
  console.log('🔄 Creating reposts...')
  const repost1 = await prisma.post.create({
    data: {
      desc: 'This is so true! 👏',
      userId: john.id,
      rePostId: post8.id,
    },
  })

  const repost2 = await prisma.post.create({
    data: {
      userId: bob.id,
      rePostId: post5.id,
    },
  })

  console.log('✅ Created 16 posts (10 original, 4 replies, 2 reposts)')

  // Create follows
  console.log('👥 Creating follow relationships...')
  await prisma.follow.createMany({
    data: [
      // John follows Alice, Bob, Sarah
      { followerId: john.id, followingId: alice.id },
      { followerId: john.id, followingId: bob.id },
      { followerId: john.id, followingId: sarah.id },
      
      // Alice follows John, Sarah, Mike
      { followerId: alice.id, followingId: john.id },
      { followerId: alice.id, followingId: sarah.id },
      { followerId: alice.id, followingId: mike.id },
      
      // Bob follows John, Alice, Mike
      { followerId: bob.id, followingId: john.id },
      { followerId: bob.id, followingId: alice.id },
      { followerId: bob.id, followingId: mike.id },
      
      // Sarah follows everyone
      { followerId: sarah.id, followingId: john.id },
      { followerId: sarah.id, followingId: alice.id },
      { followerId: sarah.id, followingId: bob.id },
      { followerId: sarah.id, followingId: mike.id },
      
      // Mike follows John, Sarah
      { followerId: mike.id, followingId: john.id },
      { followerId: mike.id, followingId: sarah.id },
    ],
  })

  console.log('✅ Created 15 follow relationships')

  // Create likes
  console.log('❤️  Creating likes...')
  await prisma.like.createMany({
    data: [
      // John likes several posts
      { userId: john.id, postId: post2.id },
      { userId: john.id, postId: post4.id },
      { userId: john.id, postId: post6.id },
      { userId: john.id, postId: post8.id },
      
      // Alice likes posts
      { userId: alice.id, postId: post1.id },
      { userId: alice.id, postId: post3.id },
      { userId: alice.id, postId: post5.id },
      { userId: alice.id, postId: post9.id },
      
      // Bob likes posts
      { userId: bob.id, postId: post1.id },
      { userId: bob.id, postId: post2.id },
      { userId: bob.id, postId: post6.id },
      
      // Sarah likes posts
      { userId: sarah.id, postId: post1.id },
      { userId: sarah.id, postId: post3.id },
      { userId: sarah.id, postId: post5.id },
      { userId: sarah.id, postId: post7.id },
      { userId: sarah.id, postId: post10.id },
      
      // Mike likes posts
      { userId: mike.id, postId: post1.id },
      { userId: mike.id, postId: post6.id },
      { userId: mike.id, postId: post9.id },
    ],
  })

  console.log('✅ Created 18 likes')

  // Create bookmarks
  console.log('🔖 Creating bookmarks...')
  await prisma.bookmark.createMany({
    data: [
      // John bookmarks useful posts
      { userId: john.id, postId: post3.id },
      { userId: john.id, postId: post5.id },
      { userId: john.id, postId: post9.id },
      
      // Alice bookmarks design and inspiration
      { userId: alice.id, postId: post1.id },
      { userId: alice.id, postId: post4.id },
      
      // Bob bookmarks learning resources
      { userId: bob.id, postId: post7.id },
      { userId: bob.id, postId: post9.id },
      
      // Sarah bookmarks tech posts
      { userId: sarah.id, postId: post3.id },
      { userId: sarah.id, postId: post5.id },
      { userId: sarah.id, postId: post7.id },
      
      // Mike bookmarks various posts
      { userId: mike.id, postId: post1.id },
      { userId: mike.id, postId: post6.id },
    ],
  })

  console.log('✅ Created 12 bookmarks')

  console.log('\n🎉 Seed completed successfully!')
  console.log('\n📊 Summary:')
  console.log('   - Users: 5')
  console.log('   - Posts: 16 (10 original, 4 replies, 2 reposts)')
  console.log('   - Follows: 15')
  console.log('   - Likes: 18')
  console.log('   - Bookmarks: 12')
}

main()
  .catch((error) => {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })