const courses = [
    { title: 'Full Stack Java', price: '₹29,999', description: 'Master Java, Spring Boot, and React/Angular.', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', tags: ['java', 'spring', 'react', 'angular', 'full stack'] },
    { title: 'Full Stack Python', price: '₹24,999', description: 'Learn Python, Django/Flask, and Frontend.', image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', tags: ['python', 'django', 'flask', 'frontend', 'full stack'] },
    { title: 'MERN Stack', price: '₹27,999', description: 'MongoDB, Express, React, Node.js expert.', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', tags: ['mongodb', 'express', 'react', 'node.js', 'mern', 'full stack'] },
    { title: 'Web Development', price: '₹19,999', description: 'HTML, CSS, JS, and modern frameworks.', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', tags: ['html', 'css', 'javascript', 'web development'] },
    { title: 'Data Science', price: '₹34,999', description: 'Analyze data with Python and ML.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', tags: ['python', 'ml', 'machine learning', 'data science'] },
    { title: 'Data Analyst', price: '₹22,999', description: 'Visualize and interpret data.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', tags: ['data', 'analytics', 'visualization', 'sql'] },
    { title: 'Testing', price: '₹15,999', description: 'Manual and Automation Testing.', image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', tags: ['testing', 'automation', 'selenium', 'qa'] },
    { title: 'Marketing', price: '₹18,999', description: 'Digital marketing strategies.', image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', tags: ['marketing', 'digital marketing', 'social media'] },
    { title: 'HR', price: '₹16,999', description: 'Human Resource Management.', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', tags: ['hr', 'management', 'recruitment'] },
    { title: 'Finance', price: '₹21,999', description: 'Financial planning and analysis.', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', tags: ['finance', 'accounting', 'analysis'] },
];

const jobs = [
    { title: 'Senior React Developer', company: 'TechSolutions Inc.', category: 'Software', salary: '₹12L - ₹15L', tags: ['react', 'javascript', 'frontend'] },
    { title: 'Product Manager', company: 'Global Corp', category: 'Management', salary: '₹13L - ₹16L', tags: ['product', 'management', 'agile'] },
    { title: 'Backend Node.js Engineer', company: 'StartupX', category: 'Software', salary: '₹11L - ₹14L', tags: ['node.js', 'express', 'mongodb', 'backend'] },
    { title: 'HR Business Partner', company: 'PeopleFirst', category: 'Management', salary: '₹9L - ₹11L', tags: ['hr', 'management', 'recruitment'] },
    { title: 'Full Stack Engineer', company: 'DevWorks', category: 'Software', salary: '₹10L - ₹13L', tags: ['java', 'spring', 'react', 'full stack'] },
    { title: 'Marketing Manager', company: 'Creative Agency', category: 'Management', salary: '₹8L - ₹10L', tags: ['marketing', 'brand', 'strategy'] },
];

export const getRecommendations = (profile) => {
    if (!profile || (!profile.skills && !profile.interests)) {
        return { suggestedCourses: [], suggestedJobs: [] };
    }

    const userKeywords = [
        ...(Array.isArray(profile.skills) ? profile.skills.map(s => s.toLowerCase()) : (profile.skills ? profile.skills.toLowerCase().split(/[,\s]+/) : [])),
        ...(Array.isArray(profile.interests) ? profile.interests.map(i => i.toLowerCase()) : (profile.interests ? profile.interests.toLowerCase().split(/[,\s]+/) : [])),
        ...(profile.coursePreference ? [profile.coursePreference.toLowerCase()] : [])
    ].filter(k => k && k.length > 1); // Filter out empty strings and very short headers

    const matchScore = (itemTags) => {
        let score = 0;
        itemTags.forEach(tag => {
            const lowerTag = tag.toLowerCase();
            if (userKeywords.some(keyword => lowerTag === keyword || lowerTag.includes(keyword) || keyword.includes(lowerTag))) {
                score += 1;
            }
        });
        return score;
    };

    const suggestedCourses = courses
        .map(course => ({ ...course, score: matchScore(course.tags) }))
        .filter(course => course.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 6); // Increased limit to 6

    const suggestedJobs = jobs
        .map(job => ({ ...job, score: matchScore(job.tags) }))
        .filter(job => job.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 6);

    return { suggestedCourses, suggestedJobs };
};
