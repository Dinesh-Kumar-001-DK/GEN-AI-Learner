require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Course = require('./models/Course');
const Session = require('./models/Session');
const Quiz = require('./models/Quiz');
const User = require('./models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

const courses = [
  {
    title: 'Complete Machine Learning Masterclass',
    description: 'Master machine learning from scratch with hands-on projects. Learn supervised and unsupervised learning, neural networks, and deploy ML models to production.',
    category: 'Machine Learning',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
    difficulty: 'Intermediate',
    totalDuration: 2400,
    enrolledCount: 15420,
    rating: 4.8,
    instructor: {
      name: 'Dr. Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      bio: 'Former Google ML Engineer with 10+ years experience'
    },
    price: 0,
    modules: [
      {
        title: 'Python & Math Foundations',
        lessons: [
          { 
            title: 'Python Crash Course', 
            duration: 45, 
            videoUrl: 'https://www.youtube.com/watch?v=kqtD5dpn9C8',
            summary: 'Learn Python fundamentals including variables, data types, loops, and functions. This lesson covers the essential building blocks you need for machine learning.',
            keyPoints: ['Variables and data types', 'Control flow (if/else, loops)', 'Functions and modules', 'List comprehensions'],
            codeExample: `# Python Basics for Machine Learning

# Variables and Data Types
name = "Aileraner"
age = 25
is_learning = True
scores = [85, 90, 78, 92]

# Dictionary for storing model parameters
model_params = {
    'learning_rate': 0.01,
    'epochs': 100,
    'batch_size': 32
}

# Function to calculate mean
def calculate_mean(numbers):
    return sum(numbers) / len(numbers)

# Using list comprehension
squared_scores = [score ** 2 for score in scores]

print(f"Student: {name}")
print(f"Mean Score: {calculate_mean(scores):.2f}")
print(f"Squared Scores: {squared_scores}")`
          },
          { 
            title: 'NumPy Essentials', 
            duration: 60, 
            videoUrl: 'https://www.youtube.com/watch?v=QUT1VHiLmmI',
            summary: 'Master NumPy arrays for efficient numerical computing. Learn array operations, broadcasting, and matrix manipulations essential for ML.',
            keyPoints: ['Creating and reshaping arrays', 'Array indexing and slicing', 'Mathematical operations', 'Broadcasting'],
            codeExample: `import numpy as np

# Create arrays
arr = np.array([1, 2, 3, 4, 5])
matrix = np.array([[1, 2], [3, 4], [5, 6]])

# Array operations
print("Sum:", arr.sum())
print("Mean:", arr.mean())
print("Std Dev:", arr.std())

# Matrix multiplication
result = np.dot(matrix, matrix.T)
print("Matrix shape:", result.shape)

# Reshape and slice
reshaped = arr.reshape(5, 1)
print("Reshaped:", reshaped)`
          },
          { 
            title: 'Linear Algebra for ML', 
            duration: 90, 
            videoUrl: 'https://www.youtube.com/watch?v=fNk_zzaMoSs',
            summary: 'Understand vectors, matrices, and transformations. Learn eigenvalues, eigenvectors, and their applications in ML algorithms.',
            keyPoints: ['Vectors and matrices', 'Matrix operations', 'Eigenvalues/eigenvectors', 'Linear transformations'],
            codeExample: `import numpy as np

# Vectors
v1 = np.array([1, 2, 3])
v2 = np.array([4, 5, 6])

# Dot product
dot_product = np.dot(v1, v2)

# Matrix
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

# Matrix multiplication
C = np.matmul(A, B)

# Eigenvalues and eigenvectors
eigenvalues, eigenvectors = np.linalg.eig(A)

print("Dot Product:", dot_product)
print("Matrix Multiplication:\\n", C)
print("Eigenvalues:", eigenvalues)`
          },
          { 
            title: 'Statistics & Probability', 
            duration: 75, 
            videoUrl: 'https://www.youtube.com/watch?v=YXLVjCKr7Ks',
            summary: 'Learn probability distributions, hypothesis testing, and statistical measures. Essential for understanding ML model behavior.',
            keyPoints: ['Descriptive statistics', 'Probability distributions', 'Hypothesis testing', 'Bayes theorem'],
            codeExample: `import numpy as np
from scipy import stats

data = np.array([23, 45, 67, 89, 12, 34, 56, 78, 90, 11])

# Descriptive statistics
mean = np.mean(data)
std = np.std(data)
median = np.median(data)

# Z-score (standardization)
z_scores = (data - mean) / std

# Normal distribution probability
prob = stats.norm.cdf(50, mean, std)

print(f"Mean: {mean:.2f}")
print(f"Std Dev: {std:.2f}")
print(f"Median: {median:.2f}")
print(f"P(x < 50): {prob:.4f}")`
          }
        ]
      },
      {
        title: 'Machine Learning Fundamentals',
        lessons: [
          { 
            title: 'What is Machine Learning?', 
            duration: 30, 
            videoUrl: 'https://www.youtube.com/watch?v=Air KD8LqqJ4',
            summary: 'Introduction to machine learning concepts. Understand the difference between AI, ML, and deep learning, and when to use each approach.',
            keyPoints: ['Types of ML: Supervised, Unsupervised, RL', 'ML vs Traditional Programming', 'Common ML applications', 'ML workflow overview'],
            codeExample: `# Traditional Programming vs Machine Learning

# Traditional: Rules + Data → Answers
def traditional_grade(score):
    if score >= 90:
        return 'A'
    elif score >= 80:
        return 'B'
    else:
        return 'C'

# Machine Learning: Answers + Data → Rules
from sklearn.tree import DecisionTreeClassifier

# Training data
X = [[95], [85], [75], [65], [55]]
y = ['A', 'B', 'C', 'C', 'C']

# Train model
model = DecisionTreeClassifier()
model.fit(X, y)

# Predict
print(model.predict([[88]]))  # Output: ['B']`
          },
          { 
            title: 'Supervised vs Unsupervised', 
            duration: 45, 
            videoUrl: 'https://www.youtube.com/watch?v=kE5QZ6a7N1I',
            summary: 'Compare supervised learning (labeled data, predictions) with unsupervised learning (finding patterns in unlabeled data).',
            keyPoints: ['Supervised: Classification & Regression', 'Unsupervised: Clustering & Dim. Reduction', 'Semi-supervised learning', 'When to use each type'],
            codeExample: `# Supervised Learning Example
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification

X, y = make_classification(n_samples=100, n_features=4)

clf = RandomForestClassifier()
clf.fit(X, y)
print("Supervised Accuracy:", clf.score(X, y))

# Unsupervised Learning Example
from sklearn.cluster import KMeans

# Cluster similar data points
kmeans = KMeans(n_clusters=3)
clusters = kmeans.fit_predict(X)
print("Cluster Centers:", kmeans.cluster_centers_[:2])`
          },
          { 
            title: 'Linear Regression Deep Dive', 
            duration: 90, 
            videoUrl: 'https://www.youtube.com/watch?v=4PHI11lX11I',
            summary: 'Master linear regression from hypothesis to cost function, gradient descent, and model evaluation metrics.',
            keyPoints: ['Hypothesis function', 'Cost function (MSE)', 'Gradient descent optimization', 'Model evaluation'],
            codeExample: `import numpy as np
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt

# Sample data: hours studied vs exam scores
X = np.array([[1], [2], [3], [4], [5], [6], [7], [8], [9], [10]])
y = np.array([45, 50, 55, 60, 65, 70, 75, 80, 85, 90])

# Train model
model = LinearRegression()
model.fit(X, y)

# Predict
predictions = model.predict(X)
print(f"Coefficient: {model.coef_[0]:.2f}")
print(f"Intercept: {model.intercept_:.2f}")
print(f"Score: {model.score(X, y):.4f}")

# Example: predict score for 8.5 hours
print(f"Predicted for 8.5 hours: {model.predict([[8.5]])[0]:.1f}")`
          },
          { 
            title: 'Logistic Regression', 
            duration: 75, 
            videoUrl: 'https://www.youtube.com/watch?v=yIYKR4sgzI8',
            summary: 'Learn logistic regression for binary classification. Understand sigmoid function, decision boundaries, and probability outputs.',
            keyPoints: ['Sigmoid activation function', 'Binary classification', 'Cross-entropy loss', 'Multi-class with softmax'],
            codeExample: `from sklearn.linear_model import LogisticRegression
from sklearn.datasets import make_classification

# Generate sample data
X, y = make_classification(
    n_samples=100, 
    n_features=2, 
    n_redundant=0,
    n_informative=2,
    n_clusters_per_class=1
)

# Train logistic regression
model = LogisticRegression()
model.fit(X, y)

# Predictions
predictions = model.predict(X)
probabilities = model.predict_proba(X)

print(f"Accuracy: {model.score(X, y):.2%}")
print(f"Probability of class 0: {probabilities[0][0]:.4f}")
print(f"Probability of class 1: {probabilities[0][1]:.4f}")`
          },
          { 
            title: 'Decision Trees & Random Forests', 
            duration: 90, 
            videoUrl: 'https://www.youtube.com/watch?v=7Tsvn2jW3Xg',
            summary: 'Build tree-based models for classification and regression. Learn ensemble methods with Random Forests for better accuracy.',
            keyPoints: ['Tree construction with entropy', 'Gini impurity', 'Random Forest ensemble', 'Feature importance'],
            codeExample: `from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

# Load data
iris = load_iris()
X, y = iris.data, iris.target
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train Random Forest
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)

# Evaluate
accuracy = rf.score(X_test, y_test)
print(f"Accuracy: {accuracy:.2%}")

# Feature importance
importances = rf.feature_importances_
feature_names = iris.feature_names
for name, imp in zip(feature_names, importances):
    print(f"{name}: {imp:.4f}")`
          }
        ]
      },
      {
        title: 'Advanced ML Techniques',
        lessons: [
          { 
            title: 'Support Vector Machines', 
            duration: 60, 
            videoUrl: 'https://www.youtube.com/watch?v=efR1C6CvhmE',
            summary: 'Understand SVMs for classification with hyperplanes. Learn about kernel tricks for non-linear decision boundaries.',
            keyPoints: ['Maximum margin classifier', 'Kernel functions (RBF, polynomial)', 'Soft margin vs hard margin', 'SVM for regression'],
            codeExample: `from sklearn.svm import SVC
from sklearn.datasets import make_circles
import numpy as np

# Create circular data (not linearly separable)
X, y = make_circles(n_samples=100, factor=0.3, noise=0.1)

# SVM with RBF kernel
svm = SVC(kernel='rbf', C=1.0, gamma='scale')
svm.fit(X, y)

print(f"SVM Accuracy: {svm.score(X, y):.2%}")
print(f"Number of support vectors: {len(svm.support_vectors_)}")`
          },
          { 
            title: 'K-Means Clustering', 
            duration: 45, 
            videoUrl: 'https://www.youtube.com/watch?v=4T5zZa0Z6Pg',
            summary: 'Group similar data points with K-Means clustering. Learn elbow method for finding optimal K and evaluation metrics.',
            keyPoints: ['K-Means algorithm steps', 'Initializing centroids', 'Elbow method for K selection', 'Silhouette score'],
            codeExample: `from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs
import numpy as np

# Generate sample data
X, _ = make_blobs(n_samples=300, centers=4, random_state=42)

# Find optimal K using elbow method
inertias = []
K_range = range(2, 10)

for k in K_range:
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(X)
    inertias.append(kmeans.inertia_)

print("Inertia for different K:")
for k, inertia in zip(K_range, inertias):
    print(f"  K={k}: {inertia:.2f}")

# Final model with optimal K
best_kmeans = KMeans(n_clusters=4, random_state=42)
labels = best_kmeans.fit_predict(X)
print(f"\\nCluster Centers:\\n{best_kmeans.cluster_centers_}")`
          },
          { 
            title: 'Principal Component Analysis', 
            duration: 60, 
            videoUrl: 'https://www.youtube.com/watch?v=kw9L0B8Gb04',
            summary: 'Reduce dimensionality with PCA. Understand variance, eigenvectors, and when to apply dimensionality reduction.',
            keyPoints: ['Variance and covariance', 'Eigenvectors as principal components', 'Explained variance ratio', 'Feature projection'],
            codeExample: `from sklearn.decomposition import PCA
from sklearn.datasets import load_iris
import numpy as np

# Load high-dimensional data
iris = load_iris()
X = iris.data
y = iris.target

# Apply PCA
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X)

print(f"Original shape: {X.shape}")
print(f"Reduced shape: {X_pca.shape}")
print(f"Explained variance ratio: {pca.explained_variance_ratio_}")
print(f"Total variance explained: {sum(pca.explained_variance_ratio_):.2%}")

# Show component contributions
print(f"\\nComponent 1 contributions: {pca.components_[0][:4]}")
print(f"Component 2 contributions: {pca.components_[1][:4]}")`
          },
          { 
            title: 'Model Evaluation & Tuning', 
            duration: 75, 
            videoUrl: 'https://www.youtube.com/watch?v=FiVmkKQV-ph',
            summary: 'Master model evaluation metrics and hyperparameter tuning. Learn cross-validation, grid search, and avoiding overfitting.',
            keyPoints: ['Confusion matrix and metrics', 'Cross-validation', 'Grid search and random search', 'Bias-variance tradeoff'],
            codeExample: `from sklearn.model_selection import cross_val_score, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
from sklearn.datasets import make_classification

X, y = make_classification(n_samples=1000, n_features=20)

# Cross-validation
rf = RandomForestClassifier(n_estimators=100)
scores = cross_val_score(rf, X, y, cv=5, scoring='accuracy')
print(f"CV Accuracy: {scores.mean():.2%} (+/- {scores.std()*2:.2%})")

# Grid Search
param_grid = {
    'n_estimators': [50, 100],
    'max_depth': [5, 10, None]
}
grid_search = GridSearchCV(rf, param_grid, cv=3, scoring='accuracy')
grid_search.fit(X, y)

print(f"Best params: {grid_search.best_params_}")
print(f"Best CV score: {grid_search.best_score_:.2%}")`
          }
        ]
      },
      {
        title: 'Neural Networks & Deep Learning',
        lessons: [
          { 
            title: 'Introduction to Neural Networks', 
            duration: 60, 
            videoUrl: 'https://www.youtube.com/watch?v=aircAruvnKk',
            summary: 'Understand the fundamentals of neural networks. Learn about neurons, layers, activation functions, and network architecture.',
            keyPoints: ['Neurons and weights', 'Layers: Input, Hidden, Output', 'Activation functions', 'Forward propagation'],
            codeExample: `import numpy as np

# Simple neuron
def sigmoid(x):
    return 1 / (1 + np.exp(-x))

# Inputs
inputs = np.array([0.5, 0.3, 0.2])

# Weights
weights = np.array([0.4, 0.7, 0.2])

# Bias
bias = 0.1

# Weighted sum
weighted_sum = np.dot(inputs, weights) + bias

# Activation
output = sigmoid(weighted_sum)

print(f"Inputs: {inputs}")
print(f"Weights: {weights}")
print(f"Bias: {bias}")
print(f"Weighted Sum: {weighted_sum:.4f}")
print(f"Output (after sigmoid): {output:.4f}")`
          },
          { 
            title: 'Backpropagation Explained', 
            duration: 90, 
            videoUrl: 'https://www.youtube.com/watch?v=Ilg3gGewQ5U',
            summary: 'Deep dive into backpropagation algorithm. Understand how neural networks learn through gradient descent and chain rule.',
            keyPoints: ['Chain rule in calculus', 'Gradient computation', 'Weight updates', 'Learning rate impact'],
            codeExample: `import numpy as np

# Simple neural network with backprop
class SimpleNN:
    def __init__(self):
        np.random.seed(42)
        self.weights = {
            'W1': np.random.randn(2, 3) * 0.1,
            'b1': np.zeros((1, 3)),
            'W2': np.random.randn(3, 1) * 0.1,
            'b2': np.zeros((1, 1))
        }
    
    def sigmoid(self, x):
        return 1 / (1 + np.exp(-np.clip(x, -500, 500)))
    
    def forward(self, X):
        self.z1 = np.dot(X, self.weights['W1']) + self.weights['b1']
        self.a1 = self.sigmoid(self.z1)
        self.z2 = np.dot(self.a1, self.weights['W2']) + self.weights['b2']
        self.a2 = self.sigmoid(self.z2)
        return self.a2
    
    def compute_loss(self, y, y_pred):
        m = y.shape[0]
        loss = -np.mean(y * np.log(y_pred + 1e-8) + (1 - y) * np.log(1 - y_pred + 1e-8))
        return loss

# Test the network
nn = SimpleNN()
X = np.array([[0.5, 0.3], [0.8, 0.2]])
y = np.array([[1], [0]])

output = nn.forward(X)
loss = nn.compute_loss(y, output)

print(f"Input shape: {X.shape}")
print(f"Output: {output.flatten()}")
print(f"Loss: {loss:.4f}")`
          },
          { 
            title: 'Building Your First ANN', 
            duration: 120, 
            videoUrl: 'https://www.youtube.com/watch?v=wQ8kBniZWV8',
            summary: 'Build a complete artificial neural network using PyTorch or TensorFlow. Train on real data and evaluate performance.',
            keyPoints: ['Building layers', 'Loss functions', 'Optimizers (SGD, Adam)', 'Training loop'],
            codeExample: `import torch
import torch.nn as nn
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split

# Prepare data
X, y = make_classification(n_samples=1000, n_features=20)
X_train, X_test, y_train, y_test = train_test_split(X, y)

# Convert to tensors
X_train_t = torch.FloatTensor(X_train)
y_train_t = torch.FloatTensor(y_train).unsqueeze(1)
X_test_t = torch.FloatTensor(X_test)
y_test_t = torch.FloatTensor(y_test).unsqueeze(1)

# Define model
class NeuralNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.layers = nn.Sequential(
            nn.Linear(20, 64),
            nn.ReLU(),
            nn.Linear(64, 32),
            nn.ReLU(),
            nn.Linear(32, 1),
            nn.Sigmoid()
        )
    
    def forward(self, x):
        return self.layers(x)

model = NeuralNet()
criterion = nn.BCELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

# Training
for epoch in range(100):
    optimizer.zero_grad()
    outputs = model(X_train_t)
    loss = criterion(outputs, y_train_t)
    loss.backward()
    optimizer.step()
    
    if (epoch + 1) % 20 == 0:
        print(f"Epoch {epoch+1}, Loss: {loss.item():.4f}")

# Evaluate
with torch.no_grad():
    predictions = (model(X_test_t) > 0.5).float()
    accuracy = (predictions == y_test_t).float().mean()
    print(f"Test Accuracy: {accuracy:.2%}")`
          },
          { 
            title: 'Convolutional Neural Networks', 
            duration: 90, 
            videoUrl: 'https://www.youtube.com/watch?v=YRhxdVk_sIs',
            summary: 'Learn CNNs for image processing. Understand convolutions, pooling, and build an image classifier with PyTorch.',
            keyPoints: ['Convolution operation', 'Filters and feature maps', 'Pooling layers', 'CNN architecture'],
            codeExample: `import torch
import torch.nn as nn

class CNN(nn.Module):
    def __init__(self, num_classes=10):
        super().__init__()
        self.features = nn.Sequential(
            # Conv1 + ReLU + Pool
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
            
            # Conv2 + ReLU + Pool
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
            
            # Conv3 + ReLU + Pool
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2)
        )
        
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(128 * 4 * 4, 256),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(256, num_classes)
        )
    
    def forward(self, x):
        x = self.features(x)
        x = self.classifier(x)
        return x

model = CNN(num_classes=10)
print(model)

# Count parameters
total_params = sum(p.numel() for p in model.parameters())
print(f"Total parameters: {total_params:,}")`
          }
        ]
      }
    ]
  },
  {
    title: 'React.js - Complete Developer Guide',
    description: 'Build modern web applications with React 18. Learn hooks, state management, Redux, and deploy production-ready React apps.',
    category: 'Web Development',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    difficulty: 'Intermediate',
    totalDuration: 1800,
    enrolledCount: 28350,
    rating: 4.9,
    instructor: {
      name: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      bio: 'Senior Frontend Engineer at Netflix'
    },
    price: 0,
    modules: [
      {
        title: 'React Fundamentals',
        lessons: [
          { 
            title: 'Introduction to React', 
            duration: 30, 
            videoUrl: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
            summary: 'Get started with React 18. Learn about components, JSX, and why React is the most popular frontend library.',
            keyPoints: ['What is React?', 'Virtual DOM concept', 'Component-based architecture', 'React ecosystem'],
            codeExample: `// Your first React Component
import React from 'react';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Welcome to Aileraner</h1>
        <p>Learn React with hands-on projects</p>
      </header>
    </div>
  );
}

export default App;

// Using React.createElement (JSX alternative)
// const element = React.createElement('h1', 
//   { className: 'title' }, 
//   'Hello, React!'
// );`
          },
          { 
            title: 'JSX Syntax', 
            duration: 45, 
            videoUrl: 'https://www.youtube.com/watch?v=9boJwvy0L4s',
            summary: 'Master JSX - React\'s syntax extension. Learn expressions, conditionals, loops, and best practices.',
            keyPoints: ['JSX expressions', 'Conditionals in JSX', 'Lists and keys', 'JSX attributes'],
            codeExample: `import React from 'react';

function JSXExamples() {
  const user = { name: 'Aileraner', level: 'Pro' };
  const courses = ['React', 'Node.js', 'Python'];
  const isLoggedIn = true;

  return (
    <div>
      {/* JSX Expressions */}
      <h1>Hello, {user.name}!</h1>
      <p>Level: {user.level}</p>
      
      {/* Conditional Rendering */}
      {isLoggedIn ? (
        <button>Continue Learning</button>
      ) : (
        <button>Sign In</button>
      )}
      
      {/* List Rendering with Keys */}
      <ul>
        {courses.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>
    </div>
  );
}

export default JSXExamples;`
          },
          { 
            title: 'Components & Props', 
            duration: 60, 
            videoUrl: 'https://www.youtube.com/watch?v=I80_cx0gM7w',
            summary: 'Build reusable components with props. Learn component composition, prop types, and destructuring.',
            keyPoints: ['Functional components', 'Props as function arguments', 'Default props', 'Component composition'],
            codeExample: `import React from 'react';
import PropTypes from 'prop-types';

// Card Component
function CourseCard({ title, instructor, rating, image }) {
  return (
    <div className="course-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>Instructor: {instructor}</p>
      <span>⭐ {rating}/5</span>
    </div>
  );
}

CourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  instructor: PropTypes.string,
  rating: PropTypes.number,
  image: PropTypes.string
};

CourseCard.defaultProps = {
  instructor: 'TBA',
  rating: 4.5
};

export default CourseCard;`
          },
          { 
            title: 'State & Lifecycle', 
            duration: 75, 
            videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8HOv8',
            summary: 'Understand React state and component lifecycle. Learn useState, useEffect, and managing side effects.',
            keyPoints: ['useState hook', 'useEffect hook', 'Component lifecycle', 'Cleanup functions'],
            codeExample: `import React, { useState, useEffect } from 'react';

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Similar to componentDidMount + componentDidUpdate
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch('/api/user');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUser();
    
    // Cleanup (componentWillUnmount)
    return () => {
      console.log('Component will unmount');
    };
  }, []); // Empty deps = run once

  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
    </div>
  );
}

export default UserDashboard;`
          }
        ]
      },
      {
        title: 'React Hooks',
        lessons: [
          { 
            title: 'useState Deep Dive', 
            duration: 60, 
            videoUrl: 'https://www.youtube.com/watch?v=O6P86uwfdR0',
            summary: 'Master useState hook for state management. Learn functional updates, multiple states, and state patterns.',
            keyPoints: ['Basic state', 'Functional updates', 'Object state', 'Common pitfalls'],
            codeExample: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: '', email: '' });

  // Functional update (safe for async)
  const increment = () => setCount(prev => prev + 1);
  
  // Update nested object properly
  const updateUser = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      
      <input
        value={user.name}
        onChange={e => updateUser('name', e.target.value)}
        placeholder="Name"
      />
      <input
        value={user.email}
        onChange={e => updateUser('email', e.target.value)}
        placeholder="Email"
      />
    </div>
  );
}

export default Counter;`
          },
          { 
            title: 'useEffect Mastery', 
            duration: 90, 
            videoUrl: 'https://www.youtube.com/watch?v=1jHHGaemROE',
            summary: 'Advanced useEffect patterns. Learn dependencies, cleanup, and avoiding common mistakes.',
            keyPoints: ['Dependency array', 'Cleanup functions', 'Fetch with useEffect', 'useEffect vs useLayoutEffect'],
            codeExample: `import React, { useState, useEffect, useRef } from 'react';

function DataFetcher({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef();

  useEffect(() => {
    // Cleanup previous request
    if (abortRef.current) {
      abortRef.current.abort();
    }
    
    setLoading(true);
    abortRef.current = new AbortController();

    fetch(\`/api/users/\${userId}\`, { signal: abortRef.current.signal })
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error(err);
        }
      });

    return () => abortRef.current.abort();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  return <div>{JSON.stringify(data)}</div>;
}

export default DataFetcher;`
          },
          { 
            title: 'useContext & useReducer', 
            duration: 75, 
            videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8HOv8',
            summary: 'Global state with Context API and useReducer. Learn when to use each and how to combine them.',
            keyPoints: ['Context creation', 'useContext hook', 'useReducer for complex state', 'Context + Reducer pattern'],
            codeExample: `import React, { createContext, useContext, useReducer } from 'react';

// Create context
const AppContext = createContext();

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, {
    user: null,
    theme: 'dark'
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

// Usage: const { state, dispatch } = useApp();`
          },
          { 
            title: 'Custom Hooks', 
            duration: 60, 
            videoUrl: 'https://www.youtube.com/watch?v=6ThNsQk9c58',
            summary: 'Create reusable logic with custom hooks. Build useLocalStorage, useFetch, useDebounce hooks.',
            keyPoints: ['Custom hook pattern', 'useLocalStorage', 'useFetch', 'useDebounce'],
            codeExample: `import { useState, useEffect, useCallback } from 'react';

// Custom hook: useLocalStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key]);

  return [storedValue, setValue];
}

// Custom hook: useDebounce
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage example
function SearchComponent() {
  const [query, setQuery] = useLocalStorage('search', '');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    console.log('Searching for:', debouncedSearch);
  }, [debouncedSearch]);

  return (
    <input
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}

export { useLocalStorage, useDebounce };`
          }
        ]
      },
      {
        title: 'State Management',
        lessons: [
          { 
            title: 'Redux Fundamentals', 
            duration: 90, 
            videoUrl: 'https://www.youtube.com/watch?v=poQ6e7xF7qA',
            summary: 'Learn Redux core concepts: store, actions, reducers. Understand unidirectional data flow.',
            keyPoints: ['Redux store', 'Actions and action creators', 'Reducers', 'Dispatch'],
            codeExample: `// store.js
import { createStore } from 'redux';

const initialState = { count: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
}

const store = createStore(counterReducer);

// Subscribe to changes
store.subscribe(() => console.log(store.getState()));

// Dispatch actions
store.dispatch({ type: 'INCREMENT' });  // { count: 1 }
store.dispatch({ type: 'INCREMENT' });  // { count: 2 }
store.dispatch({ type: 'DECREMENT' });  // { count: 1 }`
          },
          { 
            title: 'Redux Toolkit', 
            duration: 75, 
            videoUrl: 'https://www.youtube.com/watch?v=0awA0NgutDo',
            summary: 'Modern Redux with Redux Toolkit. Learn slices, createSlice, and configureStore for cleaner code.',
            keyPoints: ['configureStore', 'createSlice', 'createAsyncThunk', 'Immer for immutable updates'],
            codeExample: `import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk
export const fetchUser = createAsyncThunk(
  'user/fetch',
  async (userId) => {
    const response = await fetch(\`/api/users/\${userId}\`);
    return response.json();
  }
);

// Slice with createSlice
const userSlice = createSlice({
  name: 'user',
  initialState: { data: null, loading: false, error: null },
  reducers: {
    setUser: (state, action) => { state.data = action.payload; },
    clearUser: (state) => { state.data = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => { state.loading = true; })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setUser, clearUser } = userSlice.actions;

// Configure store
export const store = configureStore({
  reducer: {
    user: userSlice.reducer
  }
});`
          },
          { 
            title: 'React Query', 
            duration: 60, 
            videoUrl: 'https://www.youtube.com/watch?v=NovmF5OOoHU',
            summary: 'Master React Query for server state. Learn data fetching, caching, mutations, and optimistic updates.',
            keyPoints: ['useQuery hook', 'useMutation hook', 'Caching and refetching', 'Optimistic updates'],
            codeExample: `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetch courses
function useCourses() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const res = await fetch('/api/courses');
      return res.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Create course mutation
function useCreateCourse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (newCourse) => {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCourse)
      });
      return res.json();
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    }
  });
}

// Usage
function CoursesList() {
  const { data, isLoading, error } = useCourses();
  const createCourse = useCreateCourse();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
      <button onClick={() => createCourse.mutate({ title: 'New Course' })}>
        Add Course
      </button>
    </div>
  );
}`
          },
          { 
            title: 'Zustand State Management', 
            duration: 45, 
            videoUrl: 'https://www.youtube.com/watch?v=82YNcW-4fUI',
            summary: 'Lightweight state management with Zustand. Learn create function, slices, and middleware.',
            keyPoints: ['Simple store creation', 'Zustand vs Redux', 'Middleware (persist, devtools)', 'Subscription'],
            codeExample: `import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Create store
const useStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      courses: [],
      
      // Actions
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
      
      addCourse: (course) => set((state) => ({
        courses: [...state.courses, course]
      })),
      
      // Computed
      getCourseCount: () => get().courses.length,
      
      // Middleware-ready
    }),
    {
      name: 'aileraner-storage',
    }
  )
);

// Usage in components
function Navbar() {
  const { user, logout } = useStore();
  return user ? (
    <button onClick={logout}>Logout</button>
  ) : (
    <a href="/login">Login</a>
  );
}

function Dashboard() {
  const { courses, addCourse, getCourseCount } = useStore();
  return (
    <div>
      <p>You have {getCourseCount()} courses</p>
      <button onClick={() => addCourse({ id: 1, title: 'React' })}>
        Add Course
      </button>
    </div>
  );
}

export { useStore };`
          }
        ]
      },
      {
        title: 'Production Deployment',
        lessons: [
          { 
            title: 'Performance Optimization', 
            duration: 90, 
            videoUrl: 'https://www.youtube.com/watch?v=0fIfi6kDCQI',
            summary: 'Optimize React app performance. Learn memoization, code splitting, lazy loading, and profiling.',
            keyPoints: ['React.memo and useMemo', 'Code splitting with React.lazy', 'Virtualization for long lists', 'Profiling with DevTools'],
            codeExample: `import React, { useMemo, useCallback, lazy, Suspense } from 'react';

// Component memoization
const ExpensiveComponent = React.memo(({ data, onClick }) => {
  // Only re-renders when data or onClick changes
  return <div>{/* expensive rendering */}</div>;
});

// Memoized values
function DataTable({ items, filter }) {
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item => item.name.includes(filter));
  }, [items, filter]);
  
  return <Table data={filteredItems} />;
}

// Memoized callbacks
function Parent() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback((id) => {
    console.log('Clicked:', id);
  }, []);
  
  return (
    <ExpensiveComponent 
      data={someData} 
      onClick={handleClick} 
    />
  );
}

// Code splitting
const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<div>Loading chart...</div>}>
      <HeavyChart data={chartData} />
    </Suspense>
  );
}

export { DataTable, Dashboard };`
          },
          { 
            title: 'Testing React Apps', 
            duration: 120, 
            videoUrl: 'https://www.youtube.com/watch?v=8ke4D3hVT-A',
            summary: 'Test React components with Jest and React Testing Library. Write unit, integration, and E2E tests.',
            keyPoints: ['Jest basics', 'React Testing Library', 'Testing hooks', 'Mocking API calls'],
            codeExample: `import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import UserProfile from './UserProfile';

// Mock server setup
const server = setupServer(
  rest.get('/api/user/1', (req, res, ctx) => {
    return res(ctx.json({ id: 1, name: 'Aileraner', email: 'test@test.com' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Test setup helper
function renderWithProviders(ui, { preloadedState = {} } = {}) {
  const store = configureStore({
    reducer: { user: userReducer },
    preloadedState
  });
  
  return render(<Provider store={store}>{ui}</Provider>);
}

// Tests
describe('UserProfile', () => {
  it('renders user data', async () => {
    renderWithProviders(<UserProfile userId={1} />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Aileraner')).toBeInTheDocument();
    });
  });
  
  it('handles click events', () => {
    const onClick = jest.fn();
    renderWithProviders(<button onClick={onClick}>Click</button>);
    
    fireEvent.click(screen.getByText('Click'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});`
          },
          { 
            title: 'Deployment & CI/CD', 
            duration: 60, 
            videoUrl: 'https://www.youtube.com/watch?v=2VZKc7vT_rE',
            summary: 'Deploy React apps to Vercel and Netlify. Set up CI/CD pipelines with GitHub Actions.',
            keyPoints: ['Vercel deployment', 'Environment variables', 'GitHub Actions', 'Preview deployments'],
            codeExample: `# GitHub Actions CI/CD Pipeline
# .github/workflows/deploy.yml

name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test -- --coverage
      
      - name: Build
        run: npm run build
        
  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.ORG_ID }}
          vercel-project-id: \${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'`
          }
        ]
      }
    ]
  },
  {
    title: 'Data Science with Python',
    description: 'Learn data science using Python, Pandas, NumPy, and visualization libraries. Extract insights from real-world datasets.',
    category: 'Data Science',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    difficulty: 'Beginner',
    totalDuration: 2100,
    enrolledCount: 19800,
    rating: 4.7,
    instructor: {
      name: 'Prof. Michael Park',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      bio: 'Data Science Lead at Spotify'
    },
    price: 0,
    modules: [
      {
        title: 'Python for Data Science',
        lessons: [
          { 
            title: 'Python Basics Review', 
            duration: 45, 
            videoUrl: 'https://www.youtube.com/watch?v=kqtD5dpn9C8',
            summary: 'Refresh Python fundamentals for data science. Cover data types, control flow, and essential Python patterns.',
            keyPoints: ['Variables and data types', 'Functions and comprehensions', 'File handling', 'Error handling'],
            codeExample: `# Python basics for data science
import json

# Reading data from file
with open('data.json', 'r') as f:
    data = json.load(f)

# List comprehension for data transformation
squared_values = [x**2 for x in range(10) if x % 2 == 0]

# Dictionary for data aggregation
category_counts = {}
for item in data:
    category = item['category']
    category_counts[category] = category_counts.get(category, 0) + 1

# Lambda functions for data processing
process = lambda x: (x - min(x)) / (max(x) - min(x))

print("Squared values:", squared_values)
print("Category counts:", category_counts)`
          },
          { 
            title: 'NumPy Array Operations', 
            duration: 60, 
            videoUrl: 'https://www.youtube.com/watch?v=QUT1VHiLmmI',
            summary: 'Master NumPy arrays for efficient numerical operations. Learn slicing, broadcasting, and mathematical functions.',
            keyPoints: ['Array creation and indexing', 'Broadcasting', 'Mathematical functions', 'Linear algebra'],
            codeExample: `import numpy as np

# Create arrays
arr = np.arange(1, 10).reshape(3, 3)
zeros = np.zeros((2, 4))
random = np.random.rand(3, 3)

# Array operations
print("Array sum:", arr.sum(axis=0))
print("Array mean:", arr.mean())
print("Array std:", arr.std())

# Broadcasting
matrix = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
scaled = matrix * 2 + 1

# Linear algebra
eigenvalues, eigenvectors = np.linalg.eig(matrix)
determinant = np.linalg.det(matrix)

print("Eigenvalues:", eigenvalues)
print("Determinant:", determinant)`
          },
          { 
            title: 'Pandas DataFrames', 
            duration: 90, 
            videoUrl: 'https://www.youtube.com/watch?v=dcq834v2t4M',
            summary: 'Learn Pandas for data manipulation. Master DataFrames, indexing, grouping, and handling missing data.',
            keyPoints: ['DataFrame creation', 'Indexing and selection', 'GroupBy operations', 'Handling missing values'],
            codeExample: `import pandas as pd
import numpy as np

# Create DataFrame
df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Charlie', 'David'],
    'age': [25, 30, 35, 28],
    'score': [85, 92, 78, 95],
    'department': ['IT', 'HR', 'IT', 'Finance']
})

# Basic operations
print(df.head(2))
print(df.describe())
print(df.info())

# Indexing
df_filtered = df[df['age'] > 25]
df_sorted = df.sort_values('score', ascending=False)

# GroupBy
dept_avg = df.groupby('department')['score'].mean()

# Handle missing values
df_with_na = df.copy()
df_with_na.loc[1, 'score'] = np.nan
df_cleaned = df_with_na.fillna(df_with_na['score'].mean())

print("Department averages:", dept_avg)`
          },
          { 
            title: 'Data Cleaning Techniques', 
            duration: 75, 
            videoUrl: 'https://www.youtube.com/watch?v=UZwupwQmoJo',
            summary: 'Clean and prepare data for analysis. Learn handling duplicates, outliers, type conversion, and data validation.',
            keyPoints: ['Removing duplicates', 'Outlier detection', 'Type conversion', 'Data validation'],
            codeExample: `import pandas as pd
import numpy as np

# Sample messy data
df = pd.DataFrame({
    'name': ['  Alice  ', 'Bob', 'Alice', 'david'],
    'email': ['alice@.com', 'bob@test.com', 'alice@test.com', 'david@site.com'],
    'age': [25, -5, 150, 30],
    'phone': ['123-456-7890', '(987) 654-3210', '555.123.4567', '999-888-7777']
})

# Clean names
df['name'] = df['name'].str.strip().str.title()

# Validate emails
df['email_valid'] = df['email'].str.contains('@', na=False)

# Handle outliers
df['age'] = df['age'].clip(0, 120)

# Standardize phone format
df['phone'] = df['phone'].str.replace(r'[^0-9]', '', regex=True)

# Remove duplicates
df = df.drop_duplicates()

# Data type conversion
df['age'] = df['age'].astype(int)

print(df)
print("\\nData types:\\n", df.dtypes)`
          }
        ]
      },
      {
        title: 'Exploratory Data Analysis',
        lessons: [
          { 
            title: 'EDA Process', 
            duration: 45, 
            videoUrl: 'https://www.youtube.com/watch?v=haFO-u4f7Eo',
            summary: 'Learn the exploratory data analysis workflow. Understand your data before modeling with statistical summaries.',
            keyPoints: ['Data overview', 'Statistical summaries', 'Distribution analysis', 'Correlation exploration'],
            codeExample: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Load data
df = pd.read_csv('sales_data.csv')

# Quick overview
print("Shape:", df.shape)
print("\\nColumn types:")
print(df.dtypes)
print("\\nFirst 5 rows:")
print(df.head())

# Statistical summary
print("\\nNumerical summary:")
print(df.describe())

# Categorical summary
for col in df.select_dtypes(include='object'):
    print(f"\\n{col} value counts:")
    print(df[col].value_counts())

# Check for missing values
missing = df.isnull().sum()
print("\\nMissing values:\\n", missing[missing > 0])`
          },
          { 
            title: 'Statistical Analysis', 
            duration: 90, 
            videoUrl: 'https://www.youtube.com/watch?v=10ARbDP7qZk',
            summary: 'Apply statistical methods to analyze data. Learn hypothesis testing, confidence intervals, and statistical tests.',
            keyPoints: ['Descriptive statistics', 'Hypothesis testing', 'Correlation analysis', 'ANOVA and t-tests'],
            codeExample: `from scipy import stats
import numpy as np

# Sample data
group_a = np.array([78, 82, 85, 90, 88, 76, 92, 80])
group_b = np.array([85, 88, 92, 95, 90, 87, 93, 89])

# T-test for comparing means
t_stat, p_value = stats.ttest_ind(group_a, group_b)
print(f"T-statistic: {t_stat:.4f}")
print(f"P-value: {p_value:.4f}")

# Correlation analysis
data = {'X': [1, 2, 3, 4, 5], 'Y': [2, 4, 5, 4, 5]}
corr, p = stats.pearsonr(data['X'], data['Y'])
print(f"Correlation: {corr:.4f}, p-value: {p:.4f}")

# ANOVA
group_c = np.array([92, 95, 98, 94, 96, 93, 97, 95])
f_stat, p_anova = stats.f_oneway(group_a, group_b, group_c)
print(f"F-statistic: {f_stat:.4f}, p-value: {p_anova:.4f}")`
          },
          { 
            title: 'Data Visualization with Matplotlib', 
            duration: 75, 
            videoUrl: 'https://www.youtube.com/watch?v=O5ykHJ1yjwk',
            summary: 'Create informative visualizations with Matplotlib. Learn line plots, scatter plots, histograms, and customization.',
            keyPoints: ['Basic plots', 'Subplots', 'Customization', 'Saving figures'],
            codeExample: `import matplotlib.pyplot as plt
import numpy as np

# Generate sample data
x = np.linspace(0, 10, 100)
y1 = np.sin(x)
y2 = np.cos(x)

# Create figure with subplots
fig, axes = plt.subplots(2, 2, figsize=(12, 8))

# Line plot
axes[0, 0].plot(x, y1, 'b-', label='sin(x)')
axes[0, 0].plot(x, y2, 'r--', label='cos(x)')
axes[0, 0].set_title('Trigonometric Functions')
axes[0, 0].legend()
axes[0, 0].grid(True)

# Scatter plot
axes[0, 1].scatter(np.random.randn(50), np.random.randn(50), 
                    c=np.random.rand(50), alpha=0.6)
axes[0, 1].set_title('Scatter Plot')

# Histogram
axes[1, 0].hist(np.random.randn(1000), bins=30, edgecolor='black')
axes[1, 0].set_title('Histogram')

# Bar chart
axes[1, 1].bar(['Python', 'JS', 'Java', 'C++'], [45, 30, 15, 10])
axes[1, 1].set_title('Programming Languages')

plt.tight_layout()
plt.savefig('visualization.png', dpi=300)
plt.show()`
          },
          { 
            title: 'Interactive Charts with Plotly', 
            duration: 60, 
            videoUrl: 'https://www.youtube.com/watch?v=G0bqI3h0VFY',
            summary: 'Build interactive visualizations with Plotly. Create dashboards with zoom, hover, and export capabilities.',
            keyPoints: ['Plotly Express', 'Interactive features', 'Dashboards', 'Custom themes'],
            codeExample: `import plotly.express as px
import plotly.graph_objects as go
import pandas as pd

# Sample data
df = pd.DataFrame({
    'product': ['A', 'B', 'C', 'D', 'E'],
    'sales': [120, 85, 200, 150, 95],
    'profit': [30, 20, 50, 35, 25]
})

# Bar chart with Plotly Express
fig = px.bar(df, x='product', y='sales', 
             title='Sales by Product',
             color='profit',
             color_continuous_scale='Viridis')

fig.update_layout(
    xaxis_title='Product',
    yaxis_title='Sales ($)',
    template='plotly_dark'
)

# Add traces with Graph Objects
fig.add_trace(go.Scatter(
    x=df['product'],
    y=df['profit'],
    name='Profit',
    yaxis='y2'
))

fig.update_layout(
    yaxis2=dict(title='Profit ($)', overlaying='y', side='right')
)

fig.show()
fig.write_html('interactive_chart.html')`
          }
        ]
      },
      {
        title: 'Machine Learning for Data Science',
        lessons: [
          { 
            title: 'Scikit-Learn Introduction', 
            duration: 60, 
            videoUrl: 'https://www.youtube.com/watch?v=0B5eIE_1uRY',
            summary: 'Get started with scikit-learn for machine learning. Learn the consistent API for training, predicting, and evaluating.',
            keyPoints: ['Estimator API', 'Model training', 'Prediction', 'Model persistence'],
            codeExample: `from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import joblib

# Load data
X, y = load_data()  # Your data

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Preprocess
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train model
model = LinearRegression()
model.fit(X_train_scaled, y_train)

# Predict
y_pred = model.predict(X_test_scaled)

# Evaluate
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"MSE: {mse:.4f}")
print(f"R2 Score: {r2:.4f}")

# Save model
joblib.dump(model, 'model.pkl')
joblib.dump(scaler, 'scaler.pkl')`
          },
          { 
            title: 'Classification Models', 
            duration: 90, 
            videoUrl: 'https://www.youtube.com/watch?v=f6BfB8hZ3Ps',
            summary: 'Build classification models for categorical targets. Compare Logistic Regression, Decision Trees, and Random Forests.',
            keyPoints: ['Logistic Regression', 'Decision Trees', 'Random Forests', 'Model selection'],
            codeExample: `from sklearn.model_selection import cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.metrics import classification_report
from sklearn.datasets import make_classification

X, y = make_classification(n_samples=1000, n_features=20, n_classes=2)

# Compare models with cross-validation
models = {
    'Logistic Regression': LogisticRegression(max_iter=1000),
    'Random Forest': RandomForestClassifier(n_estimators=100),
    'SVM': SVC(kernel='rbf')
}

for name, model in models.items():
    scores = cross_val_score(model, X, y, cv=5, scoring='accuracy')
    print(f"{name}: {scores.mean():.3f} (+/- {scores.std()*2:.3f})")

# Best model
best_model = RandomForestClassifier(n_estimators=100)
best_model.fit(X, y)
y_pred = best_model.predict(X)

print("\\nClassification Report:")
print(classification_report(y, y_pred))`
          },
          { 
            title: 'Regression Analysis', 
            duration: 75, 
            videoUrl: 'https://www.youtube.com/watch?v=4PHI11lX11I',
            summary: 'Predict continuous values with regression models. Learn Linear Regression, Ridge, Lasso, and evaluating regression metrics.',
            keyPoints: ['Linear Regression', 'Regularization (Ridge, Lasso)', 'Polynomial features', 'Regression metrics'],
            codeExample: `from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import Ridge, Lasso
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_absolute_error
import numpy as np

# Generate non-linear data
X = np.linspace(0, 10, 100).reshape(-1, 1)
y = 3*X.squeeze()**2 + 2*X.squeeze() + 5 + np.random.randn(100)*10

# Polynomial Regression with Ridge
ridge_model = Pipeline([
    ('poly', PolynomialFeatures(degree=3)),
    ('ridge', Ridge(alpha=1.0))
])

ridge_model.fit(X, y)
y_pred = ridge_model.predict(X)

# Evaluate
mae = mean_absolute_error(y, y_pred)
print(f"Mean Absolute Error: {mae:.2f}")

# Lasso for feature selection
lasso_model = Pipeline([
    ('poly', PolynomialFeatures(degree=3)),
    ('lasso', Lasso(alpha=0.5))
])

lasso_model.fit(X, y)
print("Feature coefficients:", lasso_model.named_steps['lasso'].coef_)`
          },
          { 
            title: 'Model Evaluation Metrics', 
            duration: 60, 
            videoUrl: 'https://www.youtube.com/watch?v=FiVmkKQV-ph',
            summary: 'Understand evaluation metrics for classification and regression. Learn when to use accuracy, precision, recall, RMSE, etc.',
            keyPoints: ['Classification metrics', 'Regression metrics', 'Confusion matrix', 'ROC/AUC curves'],
            codeExample: `from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    confusion_matrix, roc_curve, auc, mean_squared_error
)
import numpy as np

# Classification metrics
y_true = [1, 0, 1, 1, 0, 1, 0, 0]
y_pred = [1, 0, 1, 0, 0, 1, 1, 0]

print("Classification Metrics:")
print(f"Accuracy:  {accuracy_score(y_true, y_pred):.4f}")
print(f"Precision: {precision_score(y_true, y_pred):.4f}")
print(f"Recall:    {recall_score(y_true, y_pred):.4f}")
print(f"F1 Score:  {f1_score(y_true, y_pred):.4f}")

# Confusion matrix
cm = confusion_matrix(y_true, y_pred)
print("\\nConfusion Matrix:")
print(cm)

# Regression metrics
y_actual = [100, 120, 130, 150, 170]
y_predicted = [95, 125, 135, 145, 175]

mse = mean_squared_error(y_actual, y_predicted)
rmse = np.sqrt(mse)
mae = np.mean(np.abs(np.array(y_actual) - np.array(y_predicted)))

print("\\nRegression Metrics:")
print(f"MSE:  {mse:.2f}")
print(f"RMSE: {rmse:.2f}")
print(f"MAE:  {mae:.2f}")`
          }
        ]
      }
    ]
  },
  {
    title: 'DevOps & Cloud Engineering',
    description: 'Master DevOps practices, Docker, Kubernetes, CI/CD pipelines, and cloud platforms. Become a cloud-native engineer.',
    category: 'DevOps',
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800',
    difficulty: 'Advanced',
    totalDuration: 2700,
    enrolledCount: 12500,
    rating: 4.8,
    instructor: {
      name: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      bio: 'Principal DevOps Engineer at AWS'
    },
    price: 0,
    modules: [
      {
        title: 'Container Fundamentals',
        lessons: [
          { 
            title: 'Docker Introduction', 
            duration: 45, 
            videoUrl: 'https://www.youtube.com/watch?v=pTFZFdj4Zao',
            summary: 'Introduction to Docker and containerization. Understand containers vs VMs and the Docker architecture.',
            keyPoints: ['What is Docker?', 'Containers vs VMs', 'Docker architecture', 'Docker Hub'],
            codeExample: `# Docker Commands Overview

# Pull an image from Docker Hub
docker pull nginx:latest

# List local images
docker images

# Run a container
docker run -d -p 8080:80 --name my-nginx nginx

# List running containers
docker ps

# Stop and remove container
docker stop my-nginx
docker rm my-nginx

# View container logs
docker logs my-nginx

# Execute command in running container
docker exec -it my-nginx bash

# Build custom image
docker build -t my-app:latest .

# Push to registry
docker push myusername/my-app:latest`
          },
          { 
            title: 'Docker Images & Containers', 
            duration: 90, 
            videoUrl: 'https://www.youtube.com/watch?v=PG XBpi9QzU',
            summary: 'Build custom Docker images with Dockerfiles. Learn multi-stage builds, layering, and optimization.',
            keyPoints: ['Dockerfile syntax', 'Image layers', 'Multi-stage builds', 'Best practices'],
            codeExample: `# Dockerfile example - Multi-stage Node.js app
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# Copy only needed files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

EXPOSE 3000
CMD ["node", "dist/server.js"]`
          },
          { 
            title: 'Docker Compose', 
            duration: 75, 
            videoUrl: 'https://www.youtube.com/watch?v=MhdGon3bAV8',
            summary: 'Orchestrate multi-container applications with Docker Compose. Define services, networks, and volumes.',
            keyPoints: ['docker-compose.yml', 'Services configuration', 'Networking', 'Volumes and environment'],
            codeExample: `# docker-compose.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
      - REDIS_URL=redis://cache:6379
    depends_on:
      - db
      - cache
    volumes:
      - ./data:/app/data

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data

  cache:
    image: redis:7-alpine
    command: redis-server --maxmemory 256mb

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro

volumes:
  postgres_data:

networks:
  default:
    name: myapp-network`
          },
          { 
            title: 'Docker Networking', 
            duration: 60, 
            videoUrl: 'https://www.youtube.com/watch?v=bCHSDeKEVdw',
            summary: 'Master Docker networking. Understand bridge, host, overlay networks and container communication.',
            keyPoints: ['Bridge network', 'Host network', 'Overlay networks', 'DNS resolution'],
            codeExample: `# Docker Network Commands

# List networks
docker network ls

# Inspect network
docker network inspect bridge

# Create custom bridge network
docker network create --driver bridge my-network

# Create overlay network (swarm)
docker network create --driver overlay my-overlay

# Run container in specific network
docker run -d --network my-network --name web nginx

# Connect existing container to network
docker network connect my-network app

# Disconnect container
docker network disconnect my-network app

# Network debugging
docker exec -it web ping db
docker exec -it web nslookup db

# Remove unused networks
docker network prune`
          }
        ]
      },
      {
        title: 'Kubernetes Mastery',
        lessons: [
          { 
            title: 'K8s Architecture', 
            duration: 60, 
            videoUrl: 'https://www.youtube.com/watch?v=TlHvYWVUZyc',
            summary: 'Understand Kubernetes architecture. Learn about control plane, worker nodes, and core components.',
            keyPoints: ['Control plane components', 'Worker node components', 'etcd', 'API server'],
            codeExample: `# Kubernetes Architecture Overview

# Control Plane Components:
# - kube-apiserver: API gateway
# - etcd: Consistent key-value store
# - kube-scheduler: Assigns pods to nodes
# - kube-controller-manager: Runs controllers

# Worker Node Components:
# - kubelet: Agent on each node
# - kube-proxy: Network proxy
# - container-runtime: e.g., containerd

# kubectl commands
kubectl get nodes
kubectl get pods -n kube-system
kubectl cluster-info
kubectl get componentstatuses

# Check API server
kubectl proxy  # Access dashboard
kubectl api-resources  # List all resources`
          },
          { 
            title: 'Pods, Services & Deployments', 
            duration: 120, 
            videoUrl: 'https://www.youtube.com/watch?v=VnvRFRkAs9E',
            summary: 'Deploy and manage applications with Pods, Deployments, and Services. Learn scaling, updates, and rolling back.',
            keyPoints: ['Pod specification', 'Deployments', 'Services (ClusterIP, NodePort, LoadBalancer)', 'Scaling'],
            codeExample: `# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  labels:
    app: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web
        image: myapp:v1
        ports:
        - containerPort: 3000
        resources:
          limits:
            memory: "128Mi"
            cpu: "500m"
          requests:
            memory: "64Mi"
            cpu: "250m"
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 10

---
apiVersion: v1
kind: Service
metadata:
  name: web-app-svc
spec:
  selector:
    app: web-app
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer`
          },
          { 
            title: 'Helm Charts', 
            duration: 90, 
            videoUrl: 'https://www.youtube.com/watch?v=-H9C11YMquY',
            summary: 'Package Kubernetes applications with Helm. Learn charts, templates, values, and managing releases.',
            keyPoints: ['Helm concepts', 'Chart structure', 'Templates', 'Release management'],
            codeExample: `# Helm commands

# Add repository
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# Search charts
helm search repo nginx
helm search hub wordpress

# Install chart
helm install my-nginx bitnami/nginx --namespace default
helm install my-app ./my-chart -f values.yaml

# List releases
helm list
helm list -n kube-system

# Upgrade
helm upgrade my-app ./my-chart --set image.tag=v2.0

# Rollback
helm history my-app
helm rollback my-app 1

# Uninstall
helm uninstall my-nginx

# Create new chart
helm create my-chart
# Chart structure:
# my-chart/
#   Chart.yaml
#   values.yaml
#   templates/
#     deployment.yaml
#     service.yaml`
          },
          { 
            title: 'K8s Security', 
            duration: 75, 
            videoUrl: 'https://www.youtube.com/watch?v=o90x-MhfNik',
            summary: 'Secure your Kubernetes clusters. Learn RBAC, network policies, secrets management, and security contexts.',
            keyPoints: ['RBAC (Role, RoleBinding)', 'Network policies', 'Secrets', 'Security contexts'],
            codeExample: `# ServiceAccount and Role
apiVersion: v1
kind: ServiceAccount
metadata:
  name: app-sa
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
subjects:
- kind: ServiceAccount
  name: app-sa
roleRef:
  kind: Role
  name: pod-reader
# Network Policy
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: web-allow-db
spec:
  podSelector:
    matchLabels:
      app: database
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: web-backend
    ports:
    - port: 5432`
          }
        ]
      },
      {
        title: 'CI/CD Pipelines',
        lessons: [
          { 
            title: 'GitHub Actions', 
            duration: 90, 
            videoUrl: 'https://www.youtube.com/watch?v=cuR0urfcQ7k',
            summary: 'Build CI/CD pipelines with GitHub Actions. Learn workflows, jobs, steps, and matrix builds.',
            keyPoints: ['Workflow syntax', 'Jobs and steps', 'Matrix builds', 'Secrets and artifacts'],
            codeExample: `# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16, 18, 20]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
        env:
          CI: true
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker image
        run: |
          docker build -t myapp:${{ github.sha }} .
          docker tag myapp:${{ github.sha }} myregistry/myapp:latest
      
      - name: Push to registry
        uses: docker/login-action@v2
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Push image
        run: |
          docker push myregistry/myapp:${{ github.sha }}
          docker push myregistry/myapp:latest`
          },
          { 
            title: 'Jenkins Pipeline', 
            duration: 120, 
            videoUrl: 'https://www.youtube.com/watch?v=lMozSjL1yv4',
            summary: 'Create Jenkins pipelines for complex workflows. Learn Groovy syntax, stages, and distributed builds.',
            keyPoints: ['Jenkinsfile syntax', 'Declarative pipelines', 'Agent stages', 'Post actions'],
            codeExample: `// Jenkinsfile (Declarative Pipeline)
pipeline {
    agent {
        docker { 
            image 'node:18-alpine' 
            args '-p 3000:3000'
        }
    }
    
    environment {
        DOCKER_IMAGE = "myapp"
        DOCKER_REGISTRY = "registry.example.com"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test -- --coverage'
                junit '**/test-results/*.xml'
            }
        }
        
        stage('Build') {
            steps {
                sh '''
                    docker build -t $DOCKER_REGISTRY/$DOCKER_IMAGE:$GIT_COMMIT .
                    docker build -t $DOCKER_REGISTRY/$DOCKER_IMAGE:latest .
                '''
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                sh "kubectl apply -f k8s/ --namespace=staging"
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            input {
                message "Deploy to production?"
                ok "Deploy"
            }
            steps {
                sh "kubectl apply -f k8s/ --namespace=production"
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            slackSend channel: '#deployments',
                     message: "Build succeeded: ${env.JOB_NAME}"
        }
        failure {
            slackSend channel: '#deployments',
                     message: "Build failed: ${env.JOB_NAME}"
        }
    }
}`
          },
          { 
            title: 'ArgoCD & GitOps', 
            duration: 90, 
            videoUrl: 'https://www.youtube.com/watch?v=4f0tJ5RxJ4g',
            summary: 'Implement GitOps with ArgoCD. Learn declarative deployments, sync policies, and application management.',
            keyPoints: ['GitOps principles', 'ArgoCD architecture', 'Application CRD', 'Sync and rollback'],
            codeExample: `# Install ArgoCD
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Application manifest (gitops/app.yaml)
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/myorg/gitops.git
    targetRevision: HEAD
    path: ./apps/my-app/production
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
    - CreateNamespace=true
    retry:
      limit: 5
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m

# CLI commands
argocd app list
argocd app sync my-app
argocd app rollback my-app
argocd app set my-app --auto-prune`
          }
        ]
      }
    ]
  },
  {
    title: 'Deep Learning with PyTorch',
    description: 'Build deep learning models with PyTorch. From neural networks to transformers - master the most flexible ML framework.',
    category: 'AI & Deep Learning',
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800',
    difficulty: 'Advanced',
    totalDuration: 3000,
    enrolledCount: 9800,
    rating: 4.9,
    instructor: {
      name: 'Dr. Lisa Wang',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      bio: 'AI Research Scientist at OpenAI'
    },
    price: 0,
    modules: [
      {
        title: 'PyTorch Fundamentals',
        lessons: [
          { 
            title: 'Tensors & Operations', 
            duration: 60, 
            videoUrl: 'https://www.youtube.com/watch?v=w0_yvrn7XEA',
            summary: 'Master PyTorch tensors - the fundamental building blocks. Learn creation, indexing, operations, and GPU acceleration.',
            keyPoints: ['Tensor creation', 'Indexing and slicing', 'Operations', 'GPU vs CPU'],
            codeExample: `import torch
import numpy as np

# Create tensors
x = torch.tensor([1.0, 2.0, 3.0])
zeros = torch.zeros(3, 4)
rand = torch.randn(2, 3)
arange = torch.arange(0, 10, step=2)

# From NumPy
np_array = np.array([1, 2, 3])
torch_from_np = torch.from_numpy(np_array)

# Operations
a = torch.tensor([[1, 2], [3, 4]])
b = torch.tensor([[5, 6], [7, 8]])

add = a + b
mul = torch.matmul(a, b)
sum_all = a.sum()
mean_val = a.float().mean()

# Reshape and transpose
x = torch.randn(2, 3, 4)
y = x.view(6, 4)  # Flatten to 6x4
z = x.permute(2, 0, 1)  # Rearrange dimensions

# GPU
if torch.cuda.is_available():
    device = torch.device('cuda')
    x_gpu = x.to(device)
    print("Running on GPU!")
else:
    print("Using CPU")`
          },
          { 
            title: 'Autograd & Backpropagation', 
            duration: 90, 
            videoUrl: 'https://www.youtube.com/watch?v=Ilg3gGewQ5U',
            summary: 'Understand automatic differentiation in PyTorch. Learn computation graphs, gradients, and manual backpropagation.',
            keyPoints: ['Computation graph', 'requires_grad', 'backward()', 'Gradient accumulation'],
            codeExample: `import torch

# Tensors with gradient tracking
x = torch.tensor([2.0, 3.0], requires_grad=True)
y = x ** 2
z = y.sum()  # z = 4 + 9 = 13

# Backpropagation
z.backward()
print("Gradient dz/dx:", x.grad)  # [4, 6]

# Custom gradient computation
w = torch.tensor([1.0, 2.0, 3.0], requires_grad=True)
b = torch.tensor(1.0, requires_grad=True)

# Forward pass
h = (w * w).sum()  # Hidden layer
logits = h + b     # Output

# Backward pass
logits.backward()
print("Gradient:", w.grad)

# Disable gradient tracking
with torch.no_grad():
    result = x * 2  # No gradient tracking
    
# Detach from graph
x_detached = x.detach()

# Custom autograd function
class CustomReLU(torch.autograd.Function):
    @staticmethod
    def forward(ctx, input):
        ctx.save_for_backward(input)
        return input.clamp(min=0)
    
    @staticmethod
    def backward(ctx, grad_output):
        input, = ctx.saved_tensors
        grad_input = grad_output.clone()
        grad_input[input < 0] = 0
        return grad_input`
          },
          { 
            title: 'Building Neural Networks', 
            duration: 120, 
            videoUrl: 'https://www.youtube.com/watch?v=wQ8kBniZWV8',
            summary: 'Create neural networks with nn.Module. Learn layers, forward pass, and building custom architectures.',
            keyPoints: ['nn.Module', 'Sequential models', 'Custom layers', 'Parameter inspection'],
            codeExample: `import torch
import torch.nn as nn

# Define network
class MLP(nn.Module):
    def __init__(self, input_size, hidden_sizes, num_classes):
        super(MLP, self).__init__()
        
        layers = []
        prev_size = input_size
        
        for hidden_size in hidden_sizes:
            layers.append(nn.Linear(prev_size, hidden_size))
            layers.append(nn.ReLU())
            layers.append(nn.Dropout(0.2))
            prev_size = hidden_size
        
        layers.append(nn.Linear(prev_size, num_classes))
        self.network = nn.Sequential(*layers)
        
    def forward(self, x):
        return self.network(x)

# Instantiate
model = MLP(input_size=784, hidden_sizes=[256, 128], num_classes=10)

# Inspect parameters
print(f"Total parameters: {sum(p.numel() for p in model.parameters())}")

for name, param in model.named_parameters():
    print(f"{name}: {param.shape}")

# Forward pass
x = torch.randn(32, 784)  # Batch of 32 images
output = model(x)
print(f"Output shape: {output.shape}")  # [32, 10]`
          },
          { 
            title: 'Training Loop', 
            duration: 75, 
            videoUrl: 'https://www.youtube.com/watch?v=IC0_ZDXf0H4',
            summary: 'Master the training loop. Learn forward pass, loss computation, backward pass, and optimization.',
            keyPoints: ['Loss functions', 'Optimizers', 'Backpropagation', 'Training vs eval mode'],
            codeExample: `import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader

# Training loop
model = MLP(784, [256, 128], 10)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

num_epochs = 10
train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)

for epoch in range(num_epochs):
    model.train()  # Training mode
    running_loss = 0.0
    correct = 0
    total = 0
    
    for batch_idx, (data, targets) in enumerate(train_loader):
        # Forward pass
        optimizer.zero_grad()
        outputs = model(data)
        loss = criterion(outputs, targets)
        
        # Backward pass
        loss.backward()
        optimizer.step()
        
        # Statistics
        running_loss += loss.item()
        _, predicted = outputs.max(1)
        total += targets.size(0)
        correct += predicted.eq(targets).sum().item()
        
    epoch_loss = running_loss / len(train_loader)
    epoch_acc = 100. * correct / total
    print(f"Epoch {epoch+1}/{num_epochs}: Loss={epoch_loss:.4f}, Acc={epoch_acc:.2f}%")

# Evaluation
model.eval()
with torch.no_grad():
    correct = 0
    total = 0
    for data, targets in test_loader:
        outputs = model(data)
        _, predicted = outputs.max(1)
        total += targets.size(0)
        correct += predicted.eq(targets).sum().item()
    print(f"Test Accuracy: {100. * correct / total:.2f}%")`
          }
        ]
      },
      {
        title: 'Convolutional Neural Networks',
        lessons: [
          { 
            title: 'CNN Architecture', 
            duration: 90, 
            videoUrl: 'https://www.youtube.com/watch?v=YRhxdVk_sIs',
            summary: 'Understand CNN architecture for image processing. Learn convolution, pooling, and layer configurations.',
            keyPoints: ['Convolutional layer', 'Pooling layer', 'Feature maps', 'Architecture patterns'],
            codeExample: `import torch
import torch.nn as nn

# CNN layer components
conv = nn.Conv2d(in_channels=3, out_channels=64, kernel_size=3, padding=1)
pool = nn.MaxPool2d(kernel_size=2, stride=2)
bn = nn.BatchNorm2d(64)

# Test with sample image
x = torch.randn(1, 3, 224, 224)  # [batch, channels, height, width]
print(f"Input: {x.shape}")

# Apply conv + bn + relu + pool
x = conv(x)
print(f"After conv: {x.shape}")
x = bn(x)
x = torch.relu(x)
x = pool(x)
print(f"After pool: {x.shape}")

# Typical CNN block
class ConvBlock(nn.Module):
    def __init__(self, in_ch, out_ch):
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(in_ch, out_ch, 3, padding=1),
            nn.BatchNorm2d(out_ch),
            nn.ReLU(inplace=True),
            nn.Conv2d(out_ch, out_ch, 3, padding=1),
            nn.BatchNorm2d(out_ch),
            nn.ReLU(inplace=True)
        )
        self.pool = nn.MaxPool2d(2)
    
    def forward(self, x):
        x = self.conv(x)
        return self.pool(x)

block = ConvBlock(3, 64)
print(f"Block output: {block(x).shape}")`
          },
          { 
            title: 'Image Classification Project', 
            duration: 180, 
            videoUrl: 'https://www.youtube.com/watch?v=dsSzLO半个E',
            summary: 'Build a complete image classifier from scratch. Train on CIFAR-10, visualize results, and evaluate performance.',
            keyPoints: ['Data loading', 'Model training', 'Visualization', 'Model evaluation'],
            codeExample: `import torch
import torch.nn as nn
import torchvision
import torchvision.transforms as transforms
from torch.utils.data import DataLoader

# Data transforms
transform_train = transforms.Compose([
    transforms.RandomCrop(32, padding=4),
    transforms.RandomHorizontalFlip(),
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
])

transform_test = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
])

# Load CIFAR-10
trainset = torchvision.datasets.CIFAR10(
    root='./data', train=True, download=True, transform=transform_train)
testset = torchvision.datasets.CIFAR10(
    root='./data', train=False, download=True, transform=transform_test)

trainloader = DataLoader(trainset, batch_size=128, shuffle=True)
testloader = DataLoader(testset, batch_size=100, shuffle=False)

classes = ['plane', 'car', 'bird', 'cat', 'deer', 
           'dog', 'frog', 'horse', 'ship', 'truck']

# Train and evaluate
def train(model, trainloader, criterion, optimizer):
    model.train()
    running_loss = 0.0
    correct = 0
    total = 0
    
    for inputs, targets in trainloader:
        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, targets)
        loss.backward()
        optimizer.step()
        
        running_loss += loss.item()
        _, predicted = outputs.max(1)
        total += targets.size(0)
        correct += predicted.eq(targets).sum().item()
    
    return 100. * correct / total

print(f"Training accuracy: {train(model, trainloader, criterion, optimizer):.2f}%")`
          },
          { 
            title: 'Transfer Learning', 
            duration: 120, 
            videoUrl: 'https://www.youtube.com/watch?v=Kewm Rl0c6k',
            summary: 'Use pre-trained models for faster training. Learn feature extraction and fine-tuning strategies.',
            keyPoints: ['Pre-trained models', 'Feature extraction', 'Fine-tuning', 'Model adaptation'],
            codeExample: `import torchvision.models as models

# Option 1: Feature Extraction
model = models.resnet50(pretrained=True)

# Freeze all layers
for param in model.parameters():
    param.requires_grad = False

# Replace classifier
num_features = model.fc.in_features
model.fc = nn.Linear(num_features, 10)  # 10 classes

# Train only the new classifier
optimizer = optim.Adam(model.fc.parameters(), lr=0.001)

# Option 2: Fine-tuning (partial)
model = models.resnet50(pretrained=True)
optimizer = optim.Adam(model.parameters(), lr=0.0001)  # Lower LR

# Option 3: Fine-tune last few layers
model = models.resnet50(pretrained=True)
for param in model.parameters():
    param.requires_grad = False

# Unfreeze last few layers
for param in list(model.parameters())[-10:]:
    param.requires_grad = True

# Option 4: Different backbone
model = models.efficientnet_b0(pretrained=True)
model.classifier[1] = nn.Linear(1280, 10)

# Save trained model
torch.save(model.state_dict(), 'model.pth')

# Load model
model = models.resnet50()
model.load_state_dict(torch.load('model.pth'))`
          },
          { 
            title: 'Object Detection', 
            duration: 150, 
            videoUrl: 'https://www.youtube.com/watch?v=G1fN7hNMkpU',
            summary: 'Detect objects in images with modern architectures. Learn YOLO, Faster R-CNN, and evaluation metrics.',
            keyPoints: ['Detection architectures', 'Bounding boxes', 'NMS', 'mAP metrics'],
            codeExample: `import torchvision
from torchvision.models.detection import fasterrcnn_resnet50_fpn
from torchvision.models.detection.rpn import AnchorGenerator

# Load pre-trained Faster R-CNN
model = fasterrcnn_resnet50_fpn(pretrained=True)

# Modify for different number of classes
num_classes = 10  # 10 classes + background
in_features = model.roi_heads.box_predictor.cls_score.in_features
model.roi_heads.box_predictor = torchvision.models.detection.faster_rcnn.FastRCNNPredictor(
    in_features, num_classes)

# For YOLO (using ultralytics library)
# from ultralytics import YOLO
# model = YOLO('yolov8n.pt')
# results = model.predict('image.jpg')
# results[0].show()

# Training object detector
model.train()
images, targets = next(iter(dataloader))
targets[0]['boxes'] = torch.tensor([[50, 50, 150, 150]], dtype=torch.float32)
targets[0]['labels'] = torch.tensor([1], dtype=torch.int64)

# Forward pass
loss_dict = model([images[0]], [targets[0]])

# Losses
losses = sum(loss for loss in loss_dict.values())
print("Total loss:", losses.item())`
          }
        ]
      },
      {
        title: 'Transformers & NLP',
        lessons: [
          { 
            title: 'Attention Mechanism', 
            duration: 90, 
            videoUrl: 'https://www.youtube.com/watch?v=UOsR7y1KMXk',
            summary: 'Understand the attention mechanism - the foundation of modern NLP. Learn self-attention and multi-head attention.',
            keyPoints: ['Query, Key, Value', 'Scaled dot-product attention', 'Multi-head attention', 'Positional encoding'],
            codeExample: `import torch
import torch.nn as nn
import torch.nn.functional as F
import math

class SelfAttention(nn.Module):
    def __init__(self, embed_size, heads):
        super().__init__()
        self.embed_size = embed_size
        self.heads = heads
        self.head_dim = embed_size // heads
        
        assert self.head_dim * heads == embed_size, "embed_size must be divisible by heads"
        
        self.values = nn.Linear(embed_size, embed_size)
        self.keys = nn.Linear(embed_size, embed_size)
        self.queries = nn.Linear(embed_size, embed_size)
        self.fc_out = nn.Linear(embed_size, embed_size)
        
    def forward(self, values, keys, query, mask):
        N = query.shape[0]
        value_len, key_len, query_len = values.shape[1], keys.shape[1], query.shape[1]
        
        # Split into heads
        values = values.reshape(N, value_len, self.heads, self.head_dim)
        keys = keys.reshape(N, key_len, self.heads, self.head_dim)
        query = query.reshape(N, query_len, self.heads, self.head_dim)
        
        # Attention scores
        energy = torch.einsum("nqhd,nkhd->nhqk", [query, keys])
        if mask is not None:
            energy = energy.masked_fill(mask == 0, float("-1e20"))
        
        attention = F.softmax(energy / (self.embed_size ** (1/2)), dim=3)
        
        # Apply attention to values
        out = torch.einsum("nhql,nlhd->nqhd", [attention, values])
        out = out.reshape(N, query_len, self.heads * self.head_dim)
        
        return self.fc_out(out)

# Test
attention = SelfAttention(256, 8)
x = torch.randn(32, 100, 256)  # [batch, seq_len, embed]
output = attention(x, x, x, mask=None)
print(f"Output shape: {output.shape}")`
          },
          { 
            title: 'BERT & GPT', 
            duration: 120, 
            videoUrl: 'https://www.youtube.com/watch?v=SXI6xN6CWVA',
            summary: 'Master transformer architectures - BERT for understanding and GPT for generation. Learn pre-training and fine-tuning.',
            keyPoints: ['BERT architecture', 'GPT architecture', 'Pre-training tasks', 'Fine-tuning'],
            codeExample: `from transformers import BertModel, GPT2Model, BertTokenizer, GPT2Tokenizer

# BERT for classification
bert = BertModel.from_pretrained('bert-base-uncased')
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

text = "Transformers are amazing for NLP tasks!"
inputs = tokenizer(text, return_tensors='pt', padding=True, truncation=True)
outputs = bert(**inputs)

# Use [CLS] token for classification
cls_embedding = outputs.last_hidden_state[:, 0, :]
print(f"BERT [CLS] embedding shape: {cls_embedding.shape}")

# GPT for text generation
gpt = GPT2Model.from_pretrained('gpt2')
gpt_tokenizer = GPT2Tokenizer.from_pretrained('gpt2')

prompt = "The future of AI is"
inputs = gpt_tokenizer(prompt, return_tensors='pt')
outputs = gpt(**inputs)

# Generate text
from transformers import pipeline
generator = pipeline('text-generation', model='gpt2')
output = generator("Once upon a time", max_length=50)
print(output[0]['generated_text'])

# Fine-tune BERT for sentiment
# from transformers import BertForSequenceClassification
# model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)
# # Train with standard PyTorch loop`
          },
          { 
            title: 'Fine-tuning Transformers', 
            duration: 150, 
            videoUrl: 'https://www.youtube.com/watch?v=M-wcbcj7sVM',
            summary: 'Fine-tune pre-trained transformers for your tasks. Learn Hugging Face Trainer, datasets, and best practices.',
            keyPoints: ['Hugging Face datasets', 'Trainer API', 'Custom training loop', 'Evaluation'],
            codeExample: `from datasets import load_dataset
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from transformers import TrainingArguments, Trainer

# Load dataset
raw_dataset = load_dataset("glue", "sst2")
tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased")

def tokenize(batch):
    return tokenizer(batch["sentence"], padding=True, truncation=True)

dataset = raw_dataset.map(tokenize, batched=True)
dataset.set_format("torch", columns=["input_ids", "attention_mask", "label"])

# Model
model = AutoModelForSequenceClassification.from_pretrained(
    "distilbert-base-uncased", num_labels=2
)

# Training arguments
training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=64,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir="./logs",
    evaluation_strategy="epoch",
    load_best_model_at_end=True,
)

# Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset["train"],
    eval_dataset=dataset["validation"],
    compute_metrics=lambda p: {
        "accuracy": (p.predictions[0] > 0).mean()
    }
)

trainer.train()

# Custom training loop
from torch.optim import AdamW
optimizer = AdamW(model.parameters(), lr=2e-5)

for epoch in range(3):
    model.train()
    for batch in train_dataloader:
        outputs = model(**batch)
        loss = outputs.loss
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()`
          },
          { 
            title: 'Building a Chatbot', 
            duration: 180, 
            videoUrl: 'https://www.youtube.com/watch?v=D5I8K5yHzPQ',
            summary: 'Build a conversational AI chatbot using transformers. Learn dialogue systems, context handling, and deployment.',
            keyPoints: ['Dialogue systems', 'Context management', 'Response generation', 'Deployment'],
            codeExample: `from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

class Chatbot:
    def __init__(self, model_name="microsoft/DialoGPT-medium"):
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForCausalLM.from_pretrained(model_name)
        self.chat_history_ids = None
        
    def generate_response(self, user_input, max_length=1000):
        # Encode user input
        new_input_ids = self.tokenizer.encode(
            user_input + self.tokenizer.eos_token, 
            return_tensors='pt'
        )
        
        # Append to history
        if self.chat_history_ids is not None:
            bot_input_ids = torch.cat([self.chat_history_ids, new_input_ids], dim=-1)
        else:
            bot_input_ids = new_input_ids
        
        # Generate response
        self.chat_history_ids = self.model.generate(
            bot_input_ids,
            max_length=max_length,
            pad_token_id=self.tokenizer.eos_token_id,
            no_repeat_ngram_size=3,
            do_sample=True,
            top_k=100,
            top_p=0.95,
            temperature=0.75
        )
        
        # Decode response
        response = self.tokenizer.decode(
            self.chat_history_ids[:, bot_input_ids.shape[-1]:][0],
            skip_special_tokens=True
        )
        return response
    
    def reset(self):
        self.chat_history_ids = None

# Usage
chatbot = Chatbot()
print("Chatbot: Hello! How can I help you?")

while True:
    user_input = input("You: ")
    if user_input.lower() in ['quit', 'exit']:
        break
    response = chatbot.generate_response(user_input)
    print(f"Chatbot: {response}")`
          }
        ]
      }
    ]
  },
  {
    title: 'System Design for Interviews',
    description: 'Master system design concepts for technical interviews. Learn to design scalable distributed systems.',
    category: 'System Design',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    difficulty: 'Advanced',
    totalDuration: 1500,
    enrolledCount: 22100,
    rating: 4.8,
    instructor: {
      name: 'Robert Kim',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
      bio: 'Staff Engineer at Google'
    },
    price: 0,
    modules: [
      {
        title: 'Fundamentals',
        lessons: [
          { 
            title: 'Scale from Zero', 
            duration: 45, 
            videoUrl: 'https://www.youtube.com/watch?v=xpDnVSmNFX8',
            summary: 'Learn how to scale systems from zero to millions of users. Understand the evolution of system architecture.',
            keyPoints: ['Single server setup', 'Database scaling', 'Caching', 'Load balancing'],
            codeExample: `# System Evolution Example

# Stage 1: Single Server
# All-in-one: Web app + Database + Cache
# flask app.py runs on single EC2 instance
# SQLite database

# Stage 2: Database Separation
# Move to RDS (PostgreSQL)
# Setup read replicas for scaling reads

# Stage 3: Add Caching Layer
from django.core.cache import cache

def get_user_profile(user_id):
    cache_key = f"user:{user_id}"
    profile = cache.get(cache_key)
    
    if profile is None:
        profile = User.objects.get(id=user_id)
        cache.set(cache_key, profile, timeout=3600)  # 1 hour
    
    return profile

# Stage 4: Load Balancer
# NGINX configuration
upstream backend {
    server app1.example.com;
    server app2.example.com;
    server app3.example.com;
}

server {
    listen 80;
    location / {
        proxy_pass http://backend;
    }
}`
          },
          { 
            title: 'Load Balancing', 
            duration: 60, 
            videoUrl: 'https://www.youtube.com/watch?v=G1fN7hNMkpU',
            summary: 'Distribute traffic across multiple servers with load balancers. Learn algorithms, health checks, and HAProxy/Nginx.',
            keyPoints: ['Load balancing algorithms', 'Health checks', 'Sticky sessions', 'SSL termination'],
            codeExample: `# NGINX Load Balancer Configuration

upstream backend {
    # Least connections algorithm
    least_conn;
    
    server app1.example.com weight=5;
    server app2.example.com weight=3;
    server app3.example.com weight=2;
    
    # Health check
    server app_backup.example.com backup;
}

server {
    listen 443 ssl http2;
    
    # SSL termination
    ssl_certificate /etc/ssl/certs/server.crt;
    ssl_certificate_key /etc/ssl/private/server.key;
    
    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://backend;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $host;
        
        # Health check endpoint
        proxy_intercept_errors off;
    }
}

# HAProxy Configuration (haproxy.cfg)
frontend http_front
    bind *:80
    default_backend app_servers

backend app_servers
    balance roundrobin
    option httpchk GET /health
    http-check expect status 200
    server app1 10.0.0.1:8080 check inter 2000 rise 2 fall 3
    server app2 10.0.0.2:8080 check inter 2000 rise 2 fall 3`
          },
          { 
            title: 'Caching Strategies', 
            duration: 75, 
            videoUrl: 'https://www.youtube.com/watch?v=U3Rk6xAME58',
            summary: 'Implement caching to speed up your system. Learn cache patterns, invalidation, and Redis/Memcached.',
            keyPoints: ['Cache patterns (Cache-aside, Write-through)', 'TTL and invalidation', 'Redis', 'Distributed cache'],
            codeExample: `import redis
from functools import wraps
import hashlib
import json

redis_client = redis.Redis(host='localhost', port=6379, db=0)

# Cache-aside pattern
def get_user(user_id):
    cache_key = f"user:{user_id}"
    
    # Try cache first
    cached = redis_client.get(cache_key)
    if cached:
        return json.loads(cached)
    
    # Fetch from database
    user = db.users.find_one({"_id": user_id})
    
    # Store in cache with TTL
    if user:
        redis_client.setex(cache_key, 3600, json.dumps(user))
    
    return user

# Write-through cache
def create_user(user_data):
    # Write to database
    user = db.users.insert_one(user_data)
    
    # Write to cache
    cache_key = f"user:{user.inserted_id}"
    redis_client.setex(cache_key, 3600, json.dumps(user_data))
    
    return user

# Cache with LRU eviction
# redis.conf: maxmemory 2gb, allkeys-lru

# Distributed locking
def acquire_lock(lock_name, timeout=10):
    lock_key = f"lock:{lock_name}"
    return redis_client.set(lock_key, "1", nx=True, ex=timeout)

def release_lock(lock_name):
    lock_key = f"lock:{lock_name}"
    redis_client.delete(lock_key)

# Decorator for caching
def cached(timeout=300):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            cache_key = f"{func.__name__}:{hashlib.md5(str(args).encode()).hexdigest()}"
            result = redis_client.get(cache_key)
            if result:
                return json.loads(result)
            result = func(*args, **kwargs)
            redis_client.setex(cache_key, timeout, json.dumps(result))
            return result
        return wrapper
    return decorator`
          },
          { 
            title: 'Database Sharding', 
            duration: 90, 
            videoUrl: 'https://www.youtube.com/watch?v=wQ8kBniZWV8',
            summary: 'Scale databases with sharding. Learn horizontal partitioning, consistent hashing, and trade-offs.',
            keyPoints: ['Sharding strategies', 'Consistent hashing', 'Shard keys', 'Rebalancing'],
            codeExample: `import hashlib

# Consistent Hashing Implementation
class ConsistentHash:
    def __init__(self, nodes=None, replicas=150):
        self.replicas = replicas
        self.ring = {}
        self.sorted_keys = []
        
        if nodes:
            for node in nodes:
                self.add_node(node)
    
    def add_node(self, node):
        for i in range(self.replicas):
            key = self._hash(f"{node}:{i}")
            self.ring[key] = node
            self.sorted_keys.append(key)
        
        self.sorted_keys.sort()
    
    def remove_node(self, node):
        for i in range(self.replicas):
            key = self._hash(f"{node}:{i}")
            del self.ring[key]
            self.sorted_keys.remove(key)
    
    def get_node(self, key):
        if not self.ring:
            return None
        
        hash_key = self._hash(key)
        
        for k in self.sorted_keys:
            if hash_key <= k:
                return self.ring[k]
        
        return self.ring[self.sorted_keys[0]]
    
    def _hash(self, key):
        return int(hashlib.md5(key.encode()).hexdigest(), 16)

# Usage
shards = ConsistentHash(['db1', 'db2', 'db3', 'db4'])

def save_user(user_id, data):
    shard = shards.get_node(user_id)
    # Save to appropriate shard
    return shard_db_mapping[shard].save(data)

# Range-based sharding (by user_id range)
def get_shard(user_id):
    if user_id < 1000000:
        return 'shard_1'
    elif user_id < 2000000:
        return 'shard_2'
    else:
        return 'shard_3'`
          }
        ]
      },
      {
        title: 'Design Patterns',
        lessons: [
          { 
            title: 'Microservices Architecture', 
            duration: 90, 
            videoUrl: 'https://www.youtube.com/watch?v=2yOOx_t4M7Y',
            summary: 'Design microservices architecture. Learn service decomposition, API gateways, and service mesh.',
            keyPoints: ['Service decomposition', 'API Gateway', 'Service discovery', 'Inter-service communication'],
            codeExample: `# Docker Compose for Microservices
version: '3.8'

services:
  api-gateway:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - user-service
      - order-service
      - product-service

  user-service:
    build: ./services/user
    environment:
      - DATABASE_URL=postgres://user:pass@postgres:5432/users
      - SERVICE_NAME=user-service

  order-service:
    build: ./services/order
    environment:
      - DATABASE_URL=postgres://user:pass@postgres:5432/orders
      - SERVICE_NAME=order-service

  product-service:
    build: ./services/product
    environment:
      - DATABASE_URL=postgres://user:pass@postgres:5432/products
      - SERVICE_NAME=product-service

  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - pgdata:/var/lib/postgresql/data

  kafka:
    image: confluentinc/cp-kafka:latest
    ports:
      - "9092:9092"

volumes:
  pgdata:`
          },
          { 
            title: 'Event-Driven Systems', 
            duration: 75, 
            videoUrl: 'https://www.youtube.com/watch?v=5y4VhdH4Cv0',
            summary: 'Build event-driven architectures for loose coupling. Learn event sourcing, CQRS, and message queues.',
            keyPoints: ['Event-driven architecture', 'Message queues', 'Event sourcing', 'CQRS pattern'],
            codeExample: `from kafka import KafkaProducer, KafkaConsumer
import json

# Event Producer
producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

def publish_event(topic, event_type, data):
    event = {
        'type': event_type,
        'data': data,
        'timestamp': time.time()
    }
    producer.send(topic, event)
    producer.flush()

# Event example
publish_event('user-events', 'USER_CREATED', {
    'user_id': '123',
    'email': 'user@example.com',
    'action': 'signup'
})

# Event Consumer
consumer = KafkaConsumer(
    'user-events',
    bootstrap_servers=['localhost:9092'],
    value_deserializer=lambda m: json.loads(m.decode('utf-8')),
    group_id='notification-service',
    auto_offset_reset='earliest'
)

for message in consumer:
    event = message.value
    print(f"Received: {event['type']}")
    
    if event['type'] == 'USER_CREATED':
        send_welcome_email(event['data']['email'])
    elif event['type'] == 'ORDER_PLACED':
        process_order(event['data'])`
          },
          { 
            title: 'Message Queues', 
            duration: 60, 
            videoUrl: 'https://www.youtube.com/watch?v=o8j4JsJMVgU',
            summary: 'Use message queues for async communication. Learn RabbitMQ, Kafka, and patterns like pub/sub.',
            keyPoints: ['Message patterns', 'RabbitMQ exchanges', 'Kafka topics', 'Dead letter queues'],
            codeExample: `# RabbitMQ with Python
import pika

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Declare exchange
channel.exchange_declare(exchange='orders', exchange_type='topic')

# Queue with DLQ
channel.queue_declare(queue='order-processing', arguments={
    'x-dead-letter-exchange': 'dlx',
    'x-dead-letter-routing-key': 'failed.orders'
})

# Bind queue to exchange
channel.queue_bind(exchange='orders', queue='order-processing', routing_key='order.*')

# Publish message
channel.basic_publish(
    exchange='orders',
    routing_key='order.created',
    body=json.dumps({'order_id': '123', 'amount': 99.99})
)

# Consume messages
def process_order(ch, method, properties, body):
    try:
        order = json.loads(body)
        # Process order...
        ch.basic_ack(delivery_tag=method.delivery_tag)
    except Exception as e:
        # Send to DLQ
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)

channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='order-processing', on_message_callback=process_order)`
          },
          { 
            title: 'CDN & Edge Computing', 
            duration: 45, 
            videoUrl: 'https://www.youtube.com/watch?v=EI7t6GOh6O8',
            summary: 'Deliver content globally with CDNs. Learn edge computing, caching strategies, and CloudFlare/CloudFront.',
            keyPoints: ['CDN concepts', 'Cache-Control headers', 'Edge functions', 'Origin shielding'],
            codeExample: `# CDN Configuration Example

# CloudFront Distribution (AWS)
# terraform code
resource "aws_cloudfront_distribution" "example" {
  origin {
    domain_name = "origin.example.com"
    origin_id   = "my-origin"
    origin_shield {
      enabled = true
      origin_shield_region = "us-east-1"
    }
  }

  default_cache_behavior {
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400

    forwarded_values {
      query_string = true
      cookies {
        forward = "all"
      }
      headers = ["Accept-Language"]
    }
  }

  price_class = "PriceClass_200"
  enabled     = true
}

# Cache-Control Headers (from origin)
response.headers['Cache-Control'] = [
    'public',
    'max-age=31536000',
    's-maxage=86400',
    'stale-while-revalidate=3600'
]

# Edge Function (CloudFlare Workers)
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const cache = caches.default
  let response = await cache.match(request)
  
  if (!response) {
    response = await fetch(request)
    response = new Response(response.body, response)
    response.headers.set('Cache-Control', 'public, max-age=3600')
    event.waitUntil(cache.put(request, response.clone()))
  }
  
  return response
}`
          }
        ]
      },
      {
        title: 'Real-World Designs',
        lessons: [
          { 
            title: 'Design URL Shortener', 
            duration: 60, 
            videoUrl: 'https://www.youtube.com/watch?v=Q98fdhH0E7g',
            summary: 'Design a URL shortening service like Bitly. Handle billions of redirects with consistent hashing.',
            keyPoints: ['URL encoding', 'Database design', 'Redirect handling', 'Analytics'],
            codeExample: `# URL Shortener Design

# Database Schema (PostgreSQL)
"""
CREATE TABLE urls (
    id BIGSERIAL PRIMARY KEY,
    short_code VARCHAR(10) UNIQUE NOT NULL,
    original_url TEXT NOT NULL,
    user_id BIGINT,
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP,
    click_count BIGINT DEFAULT 0
);

CREATE INDEX idx_short_code ON urls(short_code);
CREATE INDEX idx_user_id ON urls(user_id);
"""

# URL Encoding (Base62)
import string

BASE62 = string.ascii_letters + string.digits

def encode_url(num):
    if num == 0:
        return BASE62[0]
    result = []
    while num > 0:
        num, rem = divmod(num, 62)
        result.append(BASE62[rem])
    return ''.join(reversed(result))

def decode_url(short_code):
    num = 0
    for char in short_code:
        num = num * 62 + BASE62.index(char)
    return num

# API Endpoints
@app.route('/api/shorten', methods=['POST'])
def create_short_url():
    data = request.json
    original_url = data['url']
    
    # Generate unique code
    url_id = db.urls.insert({
        'original_url': original_url,
        'user_id': current_user.id
    })
    
    short_code = encode_url(url_id)
    return {'short_url': f'https://short.ly/{short_code}'}

@app.route('/<short_code>')
def redirect(short_code):
    url = db.urls.find_one(short_code=short_code)
    if url:
        db.urls.update({'click_count': url.click_count + 1})
        return redirect(url['original_url'])
    abort(404)`
          },
          { 
            title: 'Design Twitter', 
            duration: 120, 
            videoUrl: 'https://www.youtube.com/watch?v=K8nHLlg-APs',
            summary: 'Design Twitter-like social media platform. Handle timeline generation, fan-out, and real-time updates.',
            keyPoints: ['Fan-out on write', 'Timeline generation', 'Social graph', 'Tweet storage'],
            codeExample: `# Twitter System Design

# Database Schema
"""
users: user_id, username, email, bio, followers_count, following_count
tweets: tweet_id, user_id, content, created_at, likes_count, retweets_count
follows: follower_id, following_id
"""

# Fan-out on write (push model)
def post_tweet(user_id, content):
    tweet = {
        'tweet_id': generate_id(),
        'user_id': user_id,
        'content': content,
        'created_at': now()
    }
    
    # Save tweet
    db.tweets.insert(tweet)
    
    # Fan out to all followers' timelines
    followers = db.follows.find(following_id=user_id)
    for follower in followers:
        redis.lpush(f"timeline:{follower.user_id}", tweet)
        # Trim to keep only recent 1000 tweets
        redis.ltrim(f"timeline:{follower.user_id}", 0, 999)

# Fan-out on read (pull model)
def get_timeline(user_id, page=1, limit=20):
    # Get users they follow
    following = db.follows.find(follower_id=user_id)
    
    # Get tweets from those users
    tweets = db.tweets.find(
        user_id IN [u.id for u in following],
        limit=limit * page,
        order_by='created_at DESC'
    )
    
    return tweets[(page-1)*limit:page*limit]

# Hybrid approach (celebrity handling)
def post_tweet(user_id, content):
    tweet = db.tweets.insert({...})
    
    # Get followers
    followers = db.follows.find(following_id=user_id)
    
    # Split followers into regular and heavy users
    for follower in followers:
        if follower.followers_count < 10000:
            # Fan-out to timeline cache (push)
            redis.lpush(f"timeline:{follower.user_id}", tweet)
        else:
            # Let them fetch on read (pull)
            publish_event('user_timeline_update', {
                'user_id': follower.user_id,
                'tweet_id': tweet.tweet_id
            })
    
    return tweet`
          },
          { 
            title: 'Design YouTube', 
            duration: 120, 
            videoUrl: 'https://www.youtube.com/watch?v=DpGxdfeAg3Q',
            summary: 'Design YouTube video platform. Handle video storage, transcoding, streaming, and recommendations.',
            keyPoints: ['Video storage', 'Transcoding pipeline', 'CDN for streaming', 'Recommendations'],
            codeExample: `# YouTube System Design

# Video Upload Flow
def upload_video(user_id, video_file):
    # 1. Store raw upload in temporary storage
    video_id = generate_id()
    temp_path = f"/tmp/{video_id}"
    save_file(video_file, temp_path)
    
    # 2. Trigger transcoding pipeline
    job = {
        'video_id': video_id,
        'status': 'queued',
        'qualities': ['144p', '240p', '360p', '480p', '720p', '1080p'],
        'created_at': now()
    }
    queue.enqueue('transcode-video', job)
    
    return {'video_id': video_id, 'status': 'processing'}

# Transcoding Worker
def transcode_worker(job):
    video_id = job['video_id']
    video_path = f"/storage/raw/{video_id}"
    
    for quality in job['qualities']:
        output_path = f"/storage/ transcoded/{video_id}_{quality}.mp4"
        ffmpeg.transcode(video_path, output_path, quality)
        
        # Upload to CDN
        cdn.upload(output_path)
    
    # Generate thumbnail
    thumbnail = ffmpeg.extract_frame(video_path, timestamp='00:00:05')
    cdn.upload_thumbnail(video_id, thumbnail)
    
    # Update database
    db.videos.update(video_id, {'status': 'ready'})

# Video Streaming
def get_stream_url(video_id, quality='auto'):
    # Get user's closest CDN edge
    user_location = get_user_location(request)
    cdn_edge = get_closest_edge(user_location)
    
    # Check if quality is available
    if quality == 'auto':
        quality = detect_bandwidth(request)
    
    return f"https://{cdn_edge}/videos/{video_id}/{quality}.mp4"

# Recommendation Engine (simplified)
def get_recommendations(user_id, limit=10):
    # Get user's watch history
    watched = db.watched.find(user_id=user_id, limit=100)
    
    # Find similar users
    similar_users = find_similar_users(user_id)
    
    # Get videos they watched that user hasn't
    recommendations = []
    for u in similar_users[:20]:
        their_watches = db.watched.find(user_id=u.id, limit=50)
        for watch in their_watches:
            if watch.video_id not in watched:
                recommendations.append(watch.video_id)
    
    return recommendations[:limit]`
          },
          { 
            title: 'Design Chat System', 
            duration: 90, 
            videoUrl: 'https://www.youtube.com/watch?v?v=zKj3FXLMdVQ',
            summary: 'Design a WhatsApp-like chat application. Handle real-time messaging, presence, and end-to-end encryption.',
            keyPoints: ['WebSocket connections', 'Message ordering', 'Read receipts', 'Typing indicators'],
            codeExample: `# Chat System Design

# WebSocket Connection Manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}
    
    async def connect(self, websocket: WebSocket, user_id: str):
        await websocket.accept()
        self.active_connections[user_id] = websocket
    
    def disconnect(self, user_id: str):
        if user_id in self.active_connections:
            del self.active_connections[user_id]
    
    async def send_personal_message(self, message: str, user_id: str):
        if user_id in self.active_connections:
            await self.active_connections[user_id].send_text(message)

manager = ConnectionManager()

# Message Schema
"""
messages:
  message_id: UUID
  conversation_id: UUID
  sender_id: UUID
  content: encrypted_text
  created_at: timestamp
  delivered_at: timestamp
  read_at: timestamp
"""

@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    await manager.connect(websocket, user_id)
    
    # Update presence
    await update_presence(user_id, 'online')
    
    try:
        while True:
            data = await websocket.receive_json()
            
            if data['type'] == 'message':
                await handle_new_message(user_id, data)
            
            elif data['type'] == 'typing':
                await handle_typing_indicator(user_id, data)
            
            elif data['type'] == 'read':
                await handle_read_receipt(user_id, data)
                
    except WebSocketDisconnect:
        manager.disconnect(user_id)
        await update_presence(user_id, 'offline')

async def handle_new_message(sender_id, data):
    # Store message
    message = {
        'message_id': generate_uuid(),
        'conversation_id': data['conversation_id'],
        'sender_id': sender_id,
        'content': encrypt(data['content']),
        'created_at': now()
    }
    db.messages.insert(message)
    
    # Send to recipient if online
    recipient_id = data['recipient_id']
    if recipient_id in manager.active_connections:
        await manager.send_personal_message(
            json.dumps({'type': 'new_message', 'message': message}),
            recipient_id
        )
    else:
        # Queue for push notification
        queue.enqueue('send-notification', {
            'user_id': recipient_id,
            'message': message
        })
    
    # Send delivery confirmation
    await manager.send_personal_message(
        json.dumps({'type': 'message_sent', 'message_id': message['message_id']}),
        sender_id
    )`
          }
        ]
      }
    ]
  }
];

const sessions = [
  {
    title: 'Live: Building Your First ML Model',
    instructor: { name: 'Dr. Sarah Chen', avatar: '' },
    scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
    duration: 90,
    status: 'upcoming',
    topic: 'Machine Learning',
    description: 'Hands-on session building a complete ML pipeline from data preprocessing to model deployment.',
    maxAttendees: 100,
    meetingLink: 'https://meet.aileraner.com/ml-session'
  },
  {
    title: 'Live: React Performance Optimization',
    instructor: { name: 'Alex Thompson', avatar: '' },
    scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    duration: 60,
    status: 'upcoming',
    topic: 'Web Development',
    description: 'Learn advanced React performance techniques including memoization, code splitting, and lazy loading.',
    maxAttendees: 150,
    meetingLink: 'https://meet.aileraner.com/react-perf'
  },
  {
    title: 'Live: Docker & Kubernetes Workshop',
    instructor: { name: 'James Wilson', avatar: '' },
    scheduledAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    duration: 120,
    status: 'upcoming',
    topic: 'DevOps',
    description: 'Complete hands-on workshop covering container orchestration from development to production.',
    maxAttendees: 80,
    meetingLink: 'https://meet.aileraner.com/k8s-workshop'
  },
  {
    title: 'Live: Neural Networks from Scratch',
    instructor: { name: 'Dr. Lisa Wang', avatar: '' },
    scheduledAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    duration: 90,
    status: 'completed',
    topic: 'Deep Learning',
    description: 'Building neural networks step by step with PyTorch.',
    maxAttendees: 100,
    meetingLink: ''
  }
];

const quizzes = [
  {
    courseId: null,
    title: 'Machine Learning Fundamentals Quiz',
    description: 'Test your understanding of core ML concepts',
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        question: 'What is the main goal of supervised learning?',
        options: ['Find patterns in unlabeled data', 'Predict outcomes using labeled data', 'Reduce data dimensions', 'Cluster similar data points'],
        correctIndex: 1,
        explanation: 'Supervised learning uses labeled data to train models for prediction tasks.'
      },
      {
        question: 'Which algorithm is used for classification problems?',
        options: ['Linear Regression', 'Logistic Regression', 'K-Means', 'PCA'],
        correctIndex: 1,
        explanation: 'Logistic Regression is specifically designed for binary classification tasks.'
      },
      {
        question: 'What does overfitting mean?',
        options: ['Model performs poorly on training data', 'Model fails to generalize to new data', 'Model is too simple', 'Model has insufficient training'],
        correctIndex: 1,
        explanation: 'Overfitting occurs when a model learns the training data too well, including noise, and fails to generalize.'
      },
      {
        question: 'What is regularization in ML?',
        options: ['Increasing model complexity', 'Adding penalty to prevent overfitting', 'Removing outliers', 'Scaling features'],
        correctIndex: 1,
        explanation: 'Regularization adds a penalty term to the loss function to discourage overly complex models.'
      },
      {
        question: 'Which metric measures classification accuracy?',
        options: ['RMSE', 'MAE', 'Accuracy', 'R-squared'],
        correctIndex: 2,
        explanation: 'Accuracy is the ratio of correct predictions to total predictions in classification.'
      }
    ]
  },
  {
    courseId: null,
    title: 'React.js Essentials Quiz',
    description: 'Test your React knowledge',
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        question: 'What hook is used for state management in functional components?',
        options: ['useEffect', 'useState', 'useContext', 'useReducer only'],
        correctIndex: 1,
        explanation: 'useState is the primary hook for managing local state in functional components.'
      },
      {
        question: 'What is JSX?',
        options: ['A JavaScript library', 'A syntax extension for JavaScript', 'A CSS framework', 'A testing tool'],
        correctIndex: 1,
        explanation: 'JSX is a syntax extension that allows writing HTML-like code in JavaScript.'
      },
      {
        question: 'How do you pass data from parent to child component?',
        options: ['Using state', 'Using props', 'Using context only', 'Using Redux only'],
        correctIndex: 1,
        explanation: 'Props (properties) are the primary way to pass data from parent to child components.'
      },
      {
        question: 'What does useEffect do?',
        options: ['Manages state', 'Handles side effects in components', 'Creates components', 'Defines routes'],
        correctIndex: 1,
        explanation: 'useEffect handles side effects like data fetching, subscriptions, and DOM manipulation.'
      },
      {
        question: 'What is the virtual DOM?',
        options: ['Direct DOM manipulation', 'Lightweight copy of DOM for efficient updates', 'A database', 'A routing library'],
        correctIndex: 1,
        explanation: 'Virtual DOM is a lightweight JavaScript representation of the real DOM used by React for efficient updates.'
      }
    ]
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🗑️  Clearing existing data...');
    await Course.deleteMany({});
    await Session.deleteMany({});
    await Quiz.deleteMany({});
    await User.deleteMany({});

    console.log('📚 Seeding courses...');
    const createdCourses = await Course.insertMany(courses);
    console.log(`✅ ${createdCourses.length} courses created`);

    quizzes[0].courseId = createdCourses[0]._id;
    quizzes[1].courseId = createdCourses[1]._id;

    console.log('📝 Seeding quizzes...');
    const createdQuizzes = await Quiz.insertMany(quizzes);
    console.log(`✅ ${createdQuizzes.length} quizzes created`);

    console.log('🎥 Seeding sessions...');
    const createdSessions = await Session.insertMany(sessions);
    console.log(`✅ ${createdSessions.length} sessions created`);

    console.log('👤 Creating demo user...');
    const hashedPassword = await bcrypt.hash('demo123', 10);
    const demoUser = await User.create({
      name: 'Demo User',
      email: 'demo@aileraner.com',
      password: hashedPassword,
      learningGoal: 'Machine Learning Engineer',
      currentStreak: 47,
      totalStudyHours: 234,
      enrolledCourses: [createdCourses[0]._id, createdCourses[1]._id]
    });
    console.log(`✅ Demo user created: demo@aileraner.com / demo123`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 Course IDs (for reference):');
    createdCourses.forEach(course => {
      console.log(`  - ${course.title}: ${course._id}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

seedDatabase();
