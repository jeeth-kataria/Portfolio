import matplotlib.pyplot as plt
import numpy as np

# ==========================================
# 1. DATA CONFIGURATION (Your Specific Data)
# ==========================================
semesters = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4']
sgpa_data = [8.15, 8.15, 8.61, 8.70]

# Auto-calculate CGPA (Cumulative Average)
cgpa_data = []
running_sum = 0
for i, sgpa in enumerate(sgpa_data):
    running_sum += sgpa
    cgpa_data.append(round(running_sum / (i + 1), 2))

# ==========================================
# 2. PLOT SETUP (Dark Mode Engineering Theme)
# ==========================================
bg_color = '#0f172a'   # Dark Slate (Professional)
text_color = '#f1f5f9' # Off-white
accent_cyan = '#38bdf8' # Cyan (CGPA)
accent_grey = '#94a3b8' # Grey (SGPA)
highlight = '#facc15'   # Yellow (Achievements)

fig, ax = plt.subplots(figsize=(14, 8), facecolor=bg_color)
ax.set_facecolor(bg_color)

# ==========================================
# 3. PLOTTING DATA
# ==========================================
# Plot SGPA (Dashed line)
ax.plot(semesters, sgpa_data, color=accent_grey, marker='o', linestyle='--', 
        linewidth=2, label='Semester GPA (SGPA)', alpha=0.6)

# Plot CGPA (Solid, Bold line)
ax.plot(semesters, cgpa_data, color=accent_cyan, marker='o', 
        linewidth=4, label='Cumulative GPA (CGPA)')

# Fill area under CGPA for visual impact
ax.fill_between(semesters, cgpa_data, color=accent_cyan, alpha=0.1)

# ==========================================
# 4. MEMORABLE MILESTONES (Annotations)
# ==========================================
# We place these strategically to show you were building cool things *while* studying.

# Milestone 1: Samsung (Linked to Sem 3/4)
ax.annotate('Samsung PRISM Intern\n(Computer Vision)', 
            xy=(2, cgpa_data[2]), xytext=(1.5, cgpa_data[2] + 0.35),
            arrowprops=dict(facecolor=highlight, shrink=0.05, width=2, headwidth=8),
            fontsize=10, color=bg_color, fontweight='bold', ha='center',
            bbox=dict(boxstyle="round,pad=0.4", fc=highlight, ec="none"))

# Milestone 2: SIH / Marine (Linked to Sem 4)
ax.annotate('SIH Finalist:\nMarine Intel System', 
            xy=(3, sgpa_data[3]), xytext=(3, sgpa_data[3] - 0.4), # Below the point
            arrowprops=dict(facecolor=highlight, shrink=0.05, width=2, headwidth=8),
            fontsize=10, color=bg_color, fontweight='bold', ha='center',
            bbox=dict(boxstyle="round,pad=0.4", fc=highlight, ec="none"))

# Milestone 3: Kitsune (The "Crown Jewel" - Highlighting recent work)
# We place this slightly to the right of Sem 4 to show it's your latest achievement
ax.annotate('Published torch-kitsune v0.3.0\n(CUDA Optimization)', 
            xy=(3, cgpa_data[3]), xytext=(2.5, cgpa_data[3] + 0.5), # Above
            arrowprops=dict(facecolor=accent_cyan, shrink=0.05, width=2, headwidth=8),
            fontsize=11, color=bg_color, fontweight='bold', ha='center',
            bbox=dict(boxstyle="round,pad=0.4", fc=accent_cyan, ec="none"))

# ==========================================
# 5. STYLING & TEXT
# ==========================================
plt.title("Academic & Research Trajectory | Jeeth Bhavesh Kataria", 
          fontsize=20, color=text_color, fontweight='bold', pad=20)
plt.suptitle("M.S. Ramaiah Institute of Technology | AI & Data Science", 
             fontsize=12, color=accent_grey, y=0.92)

# Axis Styling
ax.spines['bottom'].set_color(text_color)
ax.spines['left'].set_color(text_color)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.tick_params(axis='x', colors=text_color, labelsize=12)
ax.tick_params(axis='y', colors=text_color, labelsize=12)

# Dynamic Y-Axis Scale
ax.set_ylim(8.0, 9.5) 

# Legend
legend = ax.legend(loc='upper left', facecolor=bg_color, edgecolor=text_color)
for text in legend.get_texts():
    text.set_color(text_color)

# Footer (The "Attention to Detail" Check)
plt.figtext(0.5, 0.02, "Generated programmatically via Python/Matplotlib | Data Source: MSRIT Transcripts", 
            ha="center", fontsize=9, color=accent_grey, style='italic')

# ==========================================
# 6. SAVE
# ==========================================
plt.tight_layout()
plt.savefig('Jeeth_Kataria_Academic_Trajectory.png', dpi=300, bbox_inches='tight')
print("Graph generated successfully: Jeeth_Kataria_Academic_Trajectory.png")